import { createAction, props } from '@ngrx/store';
import { LoginRequest, LoginServerResponseDTO, ResetPasswordRequest, SignupRequest } from '../../modules/auth/model/auth.model';
import { ResetPassword } from '../../modules/auth/components/reset-password/reset-password';


export const loginLoaded = createAction(
  '[login] login loaded',
  props<{request: LoginRequest}>()
)

export const loginSuccess = createAction(
  '[login] login succesfull',
  props<{userDetail: LoginServerResponseDTO}>()
)

export const loginError = createAction(
  '[login] login faliure',
  props<{error: string}>()
)


// ===========================LOGOUT===================================



export const logoutLoaded = createAction(
  '[logout] logout loaded'
)

export const logoutSuccess = createAction(
  '[logout] logout succesfull'
)

export const logoutError = createAction(
  '[logout] logout faliure'
)



// =======================SIGNUP==========================



export const signupLoaded = createAction(
  '[signup] signup loaded',
  props<{request: SignupRequest}>()
)

export const signupSuccess = createAction(
  '[signup] signup succesfull'
)

export const signupError = createAction(
  '[signup] signup faliure',
  props<{error: String}>()
)



// =======================RESET PASSWORD==========================



export const resetPasswordLoaded = createAction(
  '[resetPassword] resetPassword loaded',
  props<{request: ResetPasswordRequest}>()
)

export const resetPasswordSuccess = createAction(
  '[resetPassword] resetPassword succesfull'
)

export const resetPasswordError = createAction(
  '[resetPassword] resetPassword faliure',
  props<{error: String}>()
)