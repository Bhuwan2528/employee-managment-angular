import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = () => {

  const router = inject(Router);

  const localUser = localStorage.getItem('user');

  if (!localUser) {
    return router.createUrlTree(['/login']);
  }

  const user = JSON.parse(localUser);

  if (
    user.role.name === 'ADMIN' ||
    user.role.name === 'SUPER_ADMIN' ||
    user.role.name === 'HR'
  ) {
    return true;
  }

  return router.createUrlTree(['/employee']);
};