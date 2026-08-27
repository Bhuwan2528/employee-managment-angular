import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth-service/auth-service';

// The proactive 10s refresh loop (AuthService.setTokenRefresh) can miss its
// window -- browsers throttle/suspend setInterval in backgrounded tabs, so a
// tab left open-but-hidden past the access token's 15-minute TTL stops
// refreshing without anything actually being wrong. This interceptor is the
// fallback: on any 401 it silently refreshes once and retries the original
// request, so a session only actually dies when the refresh token itself is
// no longer valid.
//
// No dedup logic needed here for concurrent 401s -- AuthService.refreshToken
// is itself single-flight (shareReplay), so every caller within the same
// window (including the proactive interval) shares one real HTTP call and
// sees the same result, rather than racing on the single-use refresh token.
const AUTH_ENDPOINTS = ['/auth/login', '/auth/refresh', '/auth/logout'];

export const tokenRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: unknown) => {
      const isAuthEndpoint = AUTH_ENDPOINTS.some((url) => req.url.includes(url));

      if (!(error instanceof HttpErrorResponse) || error.status !== 401 || isAuthEndpoint) {
        return throwError(() => error);
      }

      return authService.refreshToken().pipe(
        switchMap((response) => {
          localStorage.setItem('accessToken', response.accessToken);
          return next(
            req.clone({ setHeaders: { Authorization: `Bearer ${response.accessToken}` } }),
          );
        }),
        catchError((refreshError) => {
          authService.forceLogout();
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
