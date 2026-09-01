import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { ToastService } from '../../../../core/services/toast.service';
import * as AuthActions from '../../../../store/actions/auth.actions';
import { PrintError } from '../../../../shared/utils/prinitingError';


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {

  fb = inject(NonNullableFormBuilder);
  store = inject(Store);
  toast = inject(ToastService);
  router = inject(Router);
  action$ = inject(Actions);
  printError = inject(PrintError)

  showPassword = false;
  showConfirmPassword = false;


  // ================= SIGNUP FORM =================

  signupForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });


  // ================= SIGNUP =================

  signup() {

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { password, confirmPassword } = this.signupForm.getRawValue();

    if (password !== confirmPassword) {
      this.toast.error('Password and Confirm Password must be same');
      return;
    }

    const request = this.signupForm.getRawValue();

    this.store.dispatch(
      AuthActions.signupLoaded({
        request
      })
    );
  }


  // ================= ACTION LISTENER =================

  constructor() {

    this.action$
      .pipe(ofType(AuthActions.signupSuccess))
      .subscribe(() => {

        this.toast.success('Account created successfully');

        // Signup successful -> Login page
        this.router.navigate(['/login']);

      });

  }

}