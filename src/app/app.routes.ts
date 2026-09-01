import { Routes } from '@angular/router';
import { Login } from './modules/auth/components/login/login';
import { authGuard } from './core/gaurds/auth-gaurd/auth-guard';
import { roleGuard } from './core/gaurds/role-gaurd/role-gaurd';
import { ADMIN_ROUTES } from './modules/admin/admin.routes';
import { EMPLOYEE_ROUTES } from './modules/employee/employee.routes';
import { Signup } from './modules/auth/components/signup/signup';
import { ResetPassword } from './modules/auth/components/reset-password/reset-password';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'reset-password',
    component: ResetPassword,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'employee',
    canActivate: [authGuard],
    children: EMPLOYEE_ROUTES
  },

  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    

    children: ADMIN_ROUTES
  },
];
// isme / route par login me nhi jaa rha 