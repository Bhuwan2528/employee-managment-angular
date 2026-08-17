import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service/auth-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/actions/auth.actions'
import { selectAuthError } from '../../../store/selectors/auth.selectors';

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
  user = JSON.parse(JSON.stringify(this.localUser))
  router = inject(Router)

  loginForm = this.fb.group({
    email: ['', [Validators.email ,Validators.required]],
    password: ['', [Validators.required]]
  })

  login(){
    console.log('btn clicked')
    this.store.dispatch(AuthActions.loginLoaded({request: this.loginForm.getRawValue()}))

    const role = this.user.role.name;
    if(role == 'ADMIN' || role == 'HR' || role == 'SUPER_ADMIN'){
      this.router.navigate(['/admin'])
    }
    else if(this.user.role.name == 'EMPLOYEE'){
      this.router.navigate(['/employee'])
    }
    else{
      this.router.navigate(['/employee'])
    }

  }

  resError = this.store.select(selectAuthError).subscribe(error =>{
    if(error){
      this.toast.error(JSON.parse(JSON.stringify(error)))
    }
  })
  
}
