import { Routes } from "@angular/router";
import { UserDashboard } from "./components/user-dashboard/user-dashboard";

export const USER_ROUTES : Routes=[
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: UserDashboard,
  },
]