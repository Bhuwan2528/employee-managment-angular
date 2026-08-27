import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../Enviorment/enviorment';
import { Observable } from 'rxjs';
import { LoginRequest, LoginServerResponseDTO, RefreshTokenResponseDTO } from '../../model/auth.model';
import { ApiConstants } from '../../../../core/API_Constants';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly baseURL = environment.apiUrl;
    private refreshIntervalId: ReturnType<typeof setInterval> | null = null;

    login(request : LoginRequest): Observable<LoginServerResponseDTO> {
        return this.http.post<LoginServerResponseDTO>( `${this.baseURL}${ApiConstants.LOGIN}`, request, { withCredentials: true } );
    }

    // The refresh token now lives only in an httpOnly cookie set by the backend
    // on /auth -- the browser attaches it automatically, so nothing to read/send here.
    refreshToken(): Observable<RefreshTokenResponseDTO>{
        return this.http.post<RefreshTokenResponseDTO>(`${this.baseURL}${ApiConstants.REFRESH_TOKEN}`, {}, { withCredentials: true })
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
    forceLogout(){
        this.stopTokenRefresh();
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    logout(){
        return this.http.post(`${this.baseURL}${ApiConstants.LOGOUT}`, {}, { withCredentials: true })
    }
}

