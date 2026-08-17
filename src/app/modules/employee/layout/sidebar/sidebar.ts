import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
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
    icon: 'fa-solid fa-house'
  },
  {
    label: 'Leaves',
    route: 'leaves',
    icon: 'fa-solid fa-calendar-days'
  },
  {
    label: 'Salary',
    route: 'salary',
    icon: 'fa-solid fa-wallet'
  }
];

router = inject(Router)
user: UserDTO | null = null;

ngOnInit(){
  const raw = localStorage.getItem('user')
  try{
    this.user = raw ? JSON.parse(raw) : null
  }
  catch{
    this.user = null
  }
}

logout(){
  localStorage.removeItem('accessToken')
  this.router.navigate(['/login'])
}

}
