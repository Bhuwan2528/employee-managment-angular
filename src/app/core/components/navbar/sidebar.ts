import { Component, inject, signal } from '@angular/core';
import { UserDTO } from '../../../modules/auth/model/auth.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DeleteDialog } from '../delete-dialog/delete-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { logoutLoaded } from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  menuItems = [
    {
      label: 'Dashboard',
      route: '/employee/home',
      icon: 'fa-solid fa-house',
      canAccess: ['EMPLOYEE'],
    },
    {
      label: 'Leaves Managment',
      route: '/employee/leaves',
      icon: 'fa-solid fa-calendar-days',
      canAccess: ['EMPLOYEE'],
    },
    {
      label: 'Salary Records',
      route: '/employee/salary',
      icon: 'fa-solid fa-wallet',
      canAccess: ['EMPLOYEE'],
    },
    {
      label: 'Admin Dashboard',
      route: '../admin/home',
      icon: 'fa-solid fa-house',
      canAccess: ['ADMIN', 'SUPER_ADMIN', 'HR'],
    },
    {
      label: 'Employee List',
      route: '../admin/employee',
      icon: 'fa-solid fa-user-group',
      canAccess: ['ADMIN', 'SUPER_ADMIN', 'HR'],
    },
    {
      label: 'Employee Attendances',
      route: '../admin/attendance',
      icon: 'fa-solid fa-calendar-days',
      canAccess: ['ADMIN', 'SUPER_ADMIN', 'HR'],
    },
    {
      label: 'Department Managment',
      route: '../admin/department',
      icon: 'fa-solid fa-building',
      canAccess: ['ADMIN', 'SUPER_ADMIN', 'HR'],
    },
    {
      label: 'Leave Managments',
      route: '../admin/leaves',
      icon: 'fa-solid fa-calendar-days',
      canAccess: ['ADMIN', 'SUPER_ADMIN', 'HR'],
    },
    {
      label: 'Payroll Managment',
      route: '../admin/payroll',
      icon: 'fa-solid fa-indian-rupee-sign',
      canAccess: ['ADMIN', 'SUPER_ADMIN', 'HR'],
    },
    {
      label: 'Roles & Admins',
      route: '../admin/admin-roles',
      icon: 'fa-solid fa-user-lock',
      canAccess: ['SUPER_ADMIN'],
    },
  ];

  router = inject(Router);
  dialog = inject(MatDialog)
  user: UserDTO | null = null;
  userRole = signal<string>('');
  store = inject(Store)

  ngOnInit() {
    const raw = localStorage.getItem('user');
    try {
      this.user = raw ? JSON.parse(raw) : null;
      this.userRole.set(this.user?.role.name ?? '');
      this.canShowMenu();
    } catch {
      this.user = null;
      this.userRole.set('');
    }
  }

  canShowMenu() {
    return this.menuItems.filter((item) => {
      return item.canAccess.includes(this.userRole());
    });
  }

  logout() {

    const dialogRef = this.dialog.open(DeleteDialog, {
      data:{
        icon: "fa-solid fa-arrow-right-from-bracket",
        title: "Logout",
        description: "You will no longer access your Account utill you login again",
        btn: 'Logout'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.store.dispatch(logoutLoaded())
      }
      else{
        console.log('delete cancel')
      }
    })


  }
}


