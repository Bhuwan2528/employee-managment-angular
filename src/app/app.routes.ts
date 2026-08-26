import { Routes } from '@angular/router';
import { Login } from './modules/auth/login/login';
import { Home } from './modules/employee/Pages/home/home';
import { AdminAttendance } from './modules/admin/pages/admin-attendance/attendance';
import { Leaves } from './modules/employee/Pages/leaves/leaves';
import { Salary } from './modules/employee/Pages/salary/salary';
import { Profile } from './modules/employee/Pages/profile/profile';
import { AdminHome } from './modules/admin/pages/admin-home/admin-home';
import { AdminEmployees } from './modules/admin/pages/admin-employees/admin-employees';
import { AdminDepartment } from './modules/admin/pages/admin-department/admin-department';
import { AdminLeaves } from './modules/admin/pages/admin-leaves/admin-leaves';
import { AdminRoles } from './modules/admin/pages/admin-roles/admin-roles';
import { AdminPayroll } from './modules/admin/pages/admin-payroll/admin-payroll';
import { authGuard } from './core/gaurds/auth-gaurd/auth-guard';
import { roleGuard } from './core/gaurds/role-gaurd/role-gaurd';
import { ADMIN_ROUTES } from './modules/admin/admin.routes';
import { EMPLOYEE_ROUTES } from './modules/employee/employee.routes';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
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