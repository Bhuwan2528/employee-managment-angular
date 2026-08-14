import { createAction, props } from '@ngrx/store';
import { LoginRequest, LoginServerResponseDTO } from '../../modules/auth/model/auth.model';


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