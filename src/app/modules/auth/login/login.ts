import { Component, inject, signal } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service/auth-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/actions/auth.actions'
import { selectAuthError } from '../../../store/selectors/auth.selectors';
import { UserDTO } from '../model/auth.model';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  fb = inject(NonNullableFormBuilder)
  store = inject(Store)
  toast = inject(ToastService)
  localUser = localStorage.getItem('user')
  user = signal<UserDTO | null>(this.localUser ? JSON.parse(this.localUser) : null)
  router = inject(Router)

  action$ = inject(Actions)

  loginForm = this.fb.group({
    email: ['', [Validators.email ,Validators.required]],
    password: ['', [Validators.required]]
  })

  login(){
    console.log('btn clicked')
    this.store.dispatch(AuthActions.loginLoaded({request: this.loginForm.getRawValue()}))
  }

  constructor(){
    this.action$.pipe(ofType(AuthActions.loginSuccess)).subscribe(login =>{
      
      this.toast.success('Login Sucessfully')
      const role = login.userDetail.user.role.name

      if(role == 'ADMIN' || role == 'HR' || role == 'SUPER_ADMIN'){
        this.router.navigate(['/admin'])
      }
      else if(role == 'EMPLOYEE'){
        this.router.navigate(['/employee'])
      }
      else{
        this.router.navigate(['/employee'])
      }
    })
  }

  resError = this.store.select(selectAuthError).subscribe(error =>{
    if(error){
      this.toast.error(JSON.parse(JSON.stringify(error)))
    }
  })
  
}
