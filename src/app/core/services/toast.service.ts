import { Injectable, signal } from '@angular/core';
import { ToastModel, ToastType } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  readonly toast = signal<ToastModel | null>(null);

  success(message: string) {
    this.show('Success', message, 'success');
  }

  error(message: string) {
    this.show('Error', message, 'error');
  }

  warning(message: string) {
    this.show('Warning', message, 'warning');
  }

  info(message: string) {
    this.show('Information', message, 'info');
  }

  private show(
    title: string,
    message: string,
    type: ToastType,
    duration: number = 3000
  ): void {

    this.toast.set({
      title,
      message,
      type,
      duration
    });

    setTimeout(() => {
      this.toast.set(null);
    }, duration);

  }

}