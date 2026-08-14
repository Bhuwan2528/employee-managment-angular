import { Routes } from '@angular/router';
import { Login } from './modules/auth/login/login';
import { Dashboard } from './modules/employee/layout/dashboard/dashboard';
import { Home } from './modules/employee/Pages/home/home';
import { AdminAttendance } from './modules/admin/pages/admin-attendance/attendance';
import { Leaves } from './modules/employee/Pages/leaves/leaves';
import { Salary } from './modules/employee/Pages/salary/salary';
import { Profile } from './modules/employee/Pages/profile/profile';
import { AdminDashboard } from './modules/admin/layout/dashboard/dashboard';
import { AdminHome } from './modules/admin/pages/admin-home/admin-home';
import { AdminEmployees } from './modules/admin/pages/admin-employees/admin-employees';
import { AdminDepartment } from './modules/admin/pages/admin-department/admin-department';
import { AdminLeaves } from './modules/admin/pages/admin-leaves/admin-leaves';
import { AdminRoles } from './modules/admin/pages/admin-roles/admin-roles';
import { AdminPayroll } from './modules/admin/pages/admin-payroll/admin-payroll';
import { authGuard } from './core/gaurds/auth-gaurd/auth-guard';
import { roleGuard } from './core/gaurds/role-gaurd/role-gaurd';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    redirectTo: 'employee',
    pathMatch: 'full',
  },

  {
    path: 'employee',
    component: Dashboard,
    canActivate: [authGuard],

    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },

      {
        path: 'home',
        component: Home,
      },

      {
        path: 'leaves',
        component: Leaves,
      },

      {
        path: 'salary',
        component: Salary,
      },

      {
        path: 'profile',
        component: Profile,
      },
    ],
  },

  {
    path: 'admin',
    component: AdminDashboard,
    canActivate: [authGuard, roleGuard],
    

    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: AdminHome,
      },
      {
        path: 'employee',
        component: AdminEmployees,
      },
      {
        path: 'attendance',
        component: AdminAttendance,
      },
      {
        path: 'department',
        component: AdminDepartment,
      },
      {
        path: 'leaves',
        component: AdminLeaves,
      },
      {
        path: 'admin-roles',
        component: AdminRoles,
      },
      {
        path: 'payroll',
        component: AdminPayroll,
      },

    ],
  },
];
