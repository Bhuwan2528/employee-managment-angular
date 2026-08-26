import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Leaves } from './Pages/leaves/leaves';
import { Salary } from './Pages/salary/salary';
import { Profile } from './Pages/profile/profile';

export const EMPLOYEE_ROUTES: Routes = [
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
];
