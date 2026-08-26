import { Routes } from '@angular/router';
import { AdminHome } from './pages/admin-home/admin-home';
import { AdminEmployees } from './pages/admin-employees/admin-employees';
import { AdminAttendance } from './pages/admin-attendance/attendance';
import { AdminDepartment } from './pages/admin-department/admin-department';
import { AdminLeaves } from './pages/admin-leaves/admin-leaves';
import { AdminRoles } from './pages/admin-roles/admin-roles';
import { AdminPayroll } from './pages/admin-payroll/admin-payroll';

export const ADMIN_ROUTES: Routes = [
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
];
