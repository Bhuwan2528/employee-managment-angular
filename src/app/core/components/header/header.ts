import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../../modules/auth/model/auth.model';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  user: UserDTO | null = null;

  ngOnInit() {
    const raw = localStorage.getItem('user');
    try {
      this.user = raw ? JSON.parse(raw) : null;
    } catch {
      this.user = null;
    }
  }
}
