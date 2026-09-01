import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../Enviorment/enviorment';
import { finalize, Observable, shareReplay } from 'rxjs';
import { LoginRequest, LoginServerResponseDTO, RefreshTokenResponseDTO, ResetPasswordRequest, SignupRequest } from '../../model/auth.model';
import { ApiConstants } from '../../../../core/API_Constants';
import { ToastService } from '../../../../core/services/toast.service';

// Cross-tab coordination for refresh: two tabs of the same session each run
// their own independent AuthService instance (separate JS realms), so the
// in-memory single-flight guard below cannot see across tabs. Since the
// refresh token is single-use, two tabs refreshing within the same window
// still race exactly like two calls in one tab used to -- one 201s, the
// other 401s and forces that tab's session to end even though it is fine.
// localStorage IS shared across tabs, so it doubles as the lock.
const REFRESH_LOCK_KEY = 'refreshLockAt';
// Generous over a normal round trip; a lock older than this is treated as
// abandoned (the tab that set it crashed or was closed mid-request) rather
// than trusted forever.
const REFRESH_LOCK_TTL_MS = 8000;
// How long a waiting tab gives the lock-holding tab to finish before giving
// up and just performing its own refresh instead of hanging indefinitely.
const CROSS_TAB_WAIT_MS = 10000;

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
        return this.http.post<LoginServerResponseDTO>( `${this.baseURL}${ApiConstants.AUTH.LOGIN}`, request, { withCredentials: true } );
    }

    // The refresh token now lives only in an httpOnly cookie set by the backend
    // on /auth -- the browser attaches it automatically, so nothing to read/send here.
    private refreshInFlight$: Observable<RefreshTokenResponseDTO> | null = null;

    // Single-flight within this tab: the proactive interval and the reactive
    // 401 interceptor can both decide to refresh within milliseconds of each
    // other. Since the refresh token is single-use, two real concurrent
    // calls mean one of them always 401s and forces a logout -- even though
    // the other one actually succeeded and the session is fine. Sharing one
    // in-flight call means every caller in that window gets the same result.
    //
    // Also single-flight across tabs, via the localStorage lock: if another
    // tab is already refreshing, this tab waits for it to write the new
    // accessToken rather than firing a second call that would just invalidate
    // the leader's single-use refresh token from under it.
    refreshToken(): Observable<RefreshTokenResponseDTO>{
        if (this.refreshInFlight$) {
            return this.refreshInFlight$;
        }

        if (this.anotherTabIsRefreshing()) {
            return this.waitForCrossTabRefresh();
        }

        this.setRefreshLock();
        this.refreshInFlight$ = this.http.post<RefreshTokenResponseDTO>(
            `${this.baseURL}${ApiConstants.AUTH.REFRESH_TOKEN}`, {}, { withCredentials: true }
        ).pipe(
            finalize(() => {
                this.refreshInFlight$ = null;
                this.clearRefreshLock();
            }),
            shareReplay(1),
        );

        return this.refreshInFlight$;
    }

    private anotherTabIsRefreshing(): boolean {
        const raw = localStorage.getItem(REFRESH_LOCK_KEY);
        if (!raw) return false;
        const age = Date.now() - Number(raw);
        return age >= 0 && age < REFRESH_LOCK_TTL_MS;
    }

    private setRefreshLock() {
        localStorage.setItem(REFRESH_LOCK_KEY, String(Date.now()));
    }

    private clearRefreshLock() {
        localStorage.removeItem(REFRESH_LOCK_KEY);
    }

    // A `storage` event fires in every OTHER tab (never the one that made the
    // change) whenever localStorage is written -- so the moment the lock
    // holder writes the refreshed accessToken, every waiting tab sees it here.
    private waitForCrossTabRefresh(): Observable<RefreshTokenResponseDTO> {
        return new Observable<RefreshTokenResponseDTO>((subscriber) => {
            let settled = false;

            const onStorage = (event: StorageEvent) => {
                if (event.key === 'accessToken' && event.newValue) {
                    settled = true;
                    cleanup();
                    subscriber.next({ accessToken: event.newValue });
                    subscriber.complete();
                }
            };
            window.addEventListener('storage', onStorage);

            const timeoutId = setTimeout(() => {
                if (settled) return;
                // The lock holder never finished (crashed, closed, or its
                // request failed) -- stop waiting and do our own refresh
                // instead of hanging on this tab forever.
                cleanup();
                this.clearRefreshLock();
                this.refreshToken().subscribe(subscriber);
            }, CROSS_TAB_WAIT_MS);

            const cleanup = () => {
                window.removeEventListener('storage', onStorage);
                clearTimeout(timeoutId);
            };

            return cleanup;
        });
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
        }, 50000)
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
        return this.http.post(`${this.baseURL}${ApiConstants.AUTH.LOGOUT}`, {}, { withCredentials: true })
    }

    signup(request: SignupRequest){
        return this.http.post(`${this.baseURL}${ApiConstants.AUTH.SIGNUP}`, request)
    }

    resetPassword(request: ResetPasswordRequest){
        return this.http.post(`${this.baseURL}${ApiConstants.AUTH.RESET_PASSWORD}`, request)
    }
}

