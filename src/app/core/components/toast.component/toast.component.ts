import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { ToastType } from '../../models/toast.model';

@Component({
  selector: 'app-toast-component',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {

  toastService = inject(ToastService)

    getIcon(type: ToastType): string {

    switch (type) {

      case 'success':
        return 'fa-solid fa-check text-success';

      case 'error':
        return 'fa-solid fa-xmark text-danger';

      case 'warning':
        return 'fa-solid fa-triangle-exclamation text-warning';

      case 'info':
        return 'fa-solid fa-info text-primary';

      default:
        return 'fa-solid fa-info text-primary';

    }

  }

    getbg(type: ToastType): string {

    switch (type) {

      case 'success':
        return 'bg-success-subtle';

      case 'error':
        return 'bg-danger-subtle';

      case 'warning':
        return 'bg-warning-subtle';

      case 'info':
        return 'bg-primary-subtle';

      default:
        return 'bg-primary-subtle';

    }

  }

}
