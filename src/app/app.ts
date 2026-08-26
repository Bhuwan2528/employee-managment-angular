import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastComponent } from './core/components/toast.component/toast.component';
import { GlobalLoaders } from "./shared/Components/global-loader/global-loaders";
import { Footer } from './core/components/footer/footer';
import { Header } from './core/components/header/header';
import { Sidebar } from './core/components/navbar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, GlobalLoaders, Header, Footer, Sidebar  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('employee-managment-system');

  router = inject(Router)
  isLoginPge(){
    if(this.router.url === '/login'){
      return false
    }
    return true
  }

  
}
