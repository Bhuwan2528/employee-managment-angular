import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth-service/auth-service';

// The proactive 10s refresh loop (AuthService.setTokenRefresh) can miss its
// window -- browsers throttle/suspend setInterval in backgrounded tabs, so a
// tab left open-but-hidden past the access token's 15-minute TTL stops
// refreshing without anything actually being wrong. This interceptor is the
// fallback: on any 401 it silently refreshes once and retries the original
// request, so a session only actually dies when the refresh token itself is
// no longer valid.
const AUTH_ENDPOINTS = ['/auth/login', '/auth/refresh', '/auth/logout'];

let isRefreshing = false;
const refreshedAccessToken$ = new BehaviorSubject<string | null>(null);

export const tokenRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: unknown) => {
      const isAuthEndpoint = AUTH_ENDPOINTS.some((url) => req.url.includes(url));

      if (!(error instanceof HttpErrorResponse) || error.status !== 401 || isAuthEndpoint) {
        return throwError(() => error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        refreshedAccessToken$.next(null);

        return authService.refreshToken().pipe(
          switchMap((response) => {
            isRefreshing = false;
            localStorage.setItem('accessToken', response.accessToken);
            refreshedAccessToken$.next(response.accessToken);
            return next(
              req.clone({ setHeaders: { Authorization: `Bearer ${response.accessToken}` } }),
            );
          }),
          catchError((refreshError) => {
            isRefreshing = false;
            authService.stopTokenRefresh();
            localStorage.clear();
            router.navigate(['/login']);
            return throwError(() => refreshError);
          }),
        );
      }

      // A refresh triggered by another request is already in flight -- wait
      // for it instead of firing a second concurrent refresh (the refresh
      // token is single-use, so a second call would just invalidate the first).
      return refreshedAccessToken$.pipe(
        filter((token): token is string => token !== null),
        take(1),
        switchMap((token) =>
          next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })),
        ),
      );
    }),
  );
};
