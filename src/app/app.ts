import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './core/components/toast.component/toast.component';
import { GlobalLoaders } from "./shared/global-loader/global-loaders";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, GlobalLoaders],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('employee-managment-system');
}
