import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { ToastService } from '../../../../core/services/toast.service';
import * as AuthActions from '../../../../store/actions/auth.actions';
import { selectAuthError } from '../../../../store/selectors/auth.selectors';
import { UserDTO } from '../../model/auth.model';
import { PrintError } from '../../../../shared/utils/prinitingError';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  fb = inject(NonNullableFormBuilder);
  store = inject(Store);
  toast = inject(ToastService);
  router = inject(Router);
  action$ = inject(Actions);
  printError = inject(PrintError)

  localUser = localStorage.getItem('user');

  user = signal<UserDTO | null>(this.localUser ? JSON.parse(this.localUser) : null);

  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  // ================= RESET PASSWORD FORM =================

  resetPasswordForm = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  // ================= RESET PASSWORD =================

  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();

      return;
    }

    const formValue = this.resetPasswordForm.getRawValue();

    if (formValue.newPassword !== formValue.confirmPassword) {
      this.toast.error('New Password and Confirm Password do not match');

      return;
    }

    this.store.dispatch(
      AuthActions.resetPasswordLoaded({
        request: formValue,
      }),
    );
  }

  // ================= ACTION LISTENER =================

  constructor() {
    this.action$.pipe(ofType(AuthActions.resetPasswordSuccess)).subscribe(() => {
      this.toast.success('Password updated successfully');

      // Password reset successful -> Login
      this.router.navigate(['/login']);
    });
  }
}
