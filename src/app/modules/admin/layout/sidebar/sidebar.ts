import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Store } from '@ngrx/store';
import { selectEmployees } from '../../../../store/selectors/employeeSelector';
import { selectAuthState, selectUser } from '../../../../store/selectors/auth.selectors';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { UserDTO } from '../../../auth/model/auth.model';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
 
menuItems = [
  {
    label: 'Home',
    route: 'home',
    icon: 'fa-solid fa-house',
    role: 'all'
  },
  {
    label: 'Employee',
    route: 'employee',
    icon: 'fa-solid fa-user-group',
    role: 'all'
  },
  {
    label: 'Attendances',
    route: 'attendance',
    icon: 'fa-solid fa-calendar-days',
    role: 'all'
  },
  {
    label: 'Departments',
    route: 'department',
    icon: 'fa-solid fa-building',
    role: 'all'
  },
  {
    label: 'Leaves',
    route: 'leaves',
    icon: 'fa-solid fa-calendar-days',
    role: 'all'
  },
  {
    label: 'Payrolls',
    route: 'payroll',
    icon: 'fa-solid fa-indian-rupee-sign',
    role: 'all'
  },
  {
    label: 'Roles & Admins',
    route: 'admin-roles',
    icon: 'fa-solid fa-user-lock',
    role: 'SUPER_ADMIN'
  },
];

store = inject(Store)
router = inject(Router)

canShowMenu(role: string) {

  if (role === 'all') {
    return true;
  }

  return this.user?.role?.name === role;
}

user: UserDTO | null = null;

ngOnInit() {
  const raw = localStorage.getItem('user');
  try {
    this.user = raw ? JSON.parse(raw) : null;
  } catch {
    this.user = null;
  }
}



logout(){
  localStorage.removeItem('accessToken')
  this.router.navigate(['/login'])
}

}
