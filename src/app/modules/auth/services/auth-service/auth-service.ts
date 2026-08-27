import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../Enviorment/enviorment';
import { finalize, Observable, shareReplay } from 'rxjs';
import { LoginRequest, LoginServerResponseDTO, RefreshTokenResponseDTO } from '../../model/auth.model';
import { ApiConstants } from '../../../../core/API_Constants';
import { ToastService } from '../../../../core/services/toast.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly toast = inject(ToastService);
    private readonly baseURL = environment.apiUrl;
    private refreshIntervalId: ReturnType<typeof setInterval> | null = null;
    // The proactive interval and the reactive 401 interceptor can both notice
    // a dead refresh token within moments of each other -- this stops the
    // second one from showing a duplicate "session expired" toast.
    private loggedOut = false;

    login(request : LoginRequest): Observable<LoginServerResponseDTO> {
        this.loggedOut = false;
        return this.http.post<LoginServerResponseDTO>( `${this.baseURL}${ApiConstants.LOGIN}`, request, { withCredentials: true } );
    }

    // The refresh token now lives only in an httpOnly cookie set by the backend
    // on /auth -- the browser attaches it automatically, so nothing to read/send here.
    private refreshInFlight$: Observable<RefreshTokenResponseDTO> | null = null;

    // Single-flight: the proactive interval and the reactive 401 interceptor
    // can both decide to refresh within milliseconds of each other. Since the
    // refresh token is single-use, two real concurrent calls mean one of them
    // always 401s and forces a logout -- even though the other one actually
    // succeeded and the session is fine. Sharing one in-flight call means
    // every caller in that window gets the same single result.
    refreshToken(): Observable<RefreshTokenResponseDTO>{
        if (this.refreshInFlight$) {
            return this.refreshInFlight$;
        }

        this.refreshInFlight$ = this.http.post<RefreshTokenResponseDTO>(
            `${this.baseURL}${ApiConstants.REFRESH_TOKEN}`, {}, { withCredentials: true }
        ).pipe(
            finalize(() => { this.refreshInFlight$ = null; }),
            shareReplay(1),
        );

        return this.refreshInFlight$;
    }

    // Guards against stacking intervals -- called both right after login and,
    // on app bootstrap, for a page reload/new tab resuming an existing session.
    setTokenRefresh(){
        this.stopTokenRefresh();
        this.refreshIntervalId = setInterval(()=>{
            this.refreshToken().subscribe({
                next: (response) => {
                    localStorage.setItem('accessToken', response.accessToken);
                    console.log("TOKEN REFRESHED", response );
                },
                // The refresh token is dead (expired/revoked) -- without this the
                // interval kept retrying every 10s forever, each failure leaking
                // an "Invalid or expired refresh token" toast on a loop instead of
                // ever actually ending the session.
                error: () => {
                    this.forceLogout();
                },
            })
        }, 10000)
    }

    stopTokenRefresh(){
        if(this.refreshIntervalId !== null){
            clearInterval(this.refreshIntervalId);
            this.refreshIntervalId = null;
        }
    }

    // Ends a session the server has already invalidated -- used here and by
    // tokenRefreshInterceptor when a reactive refresh attempt also fails.
    // Idempotent: only the first call shows the toast/navigates, so a race
    // between the interval and the interceptor never doubles up the alert.
    forceLogout(){
        if (this.loggedOut) return;
        this.loggedOut = true;
        this.stopTokenRefresh();
        localStorage.clear();
        this.toast.info('Your session has expired. Please log in again.');
        this.router.navigate(['/login']);
    }

    logout(){
        return this.http.post(`${this.baseURL}${ApiConstants.LOGOUT}`, {}, { withCredentials: true })
    }
}

