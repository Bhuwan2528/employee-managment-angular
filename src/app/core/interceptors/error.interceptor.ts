import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Something went wrong. Please try again.';

      if (error.status === 400) {
        message = error.error?.message || 'Invalid request.';
      } 
      else if (error.status === 401) {
        message = error.error?.message || 'Invalid credentials.';
      } 
      else if (error.status === 403) {
        message = error.error?.message || 'You are not allowed to perform this action.';
      } 
      else if (error.status === 404) {
        message = error.error?.message || 'Requested resource was not found.';
      } 
      else if (error.status === 409) {
        message = error.error?.message || 'This data already exists.';
      } 
      else if (error.status === 500) {
        message = 'Server error. Please try again later.';
      } 
      else if (error.status === 0) {
        message = 'Unable to connect to server.';
      }

      toast.error(message);

      return throwError(() => error);
    }),
  );
};
