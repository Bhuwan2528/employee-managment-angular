import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { initialAuthState } from '../state/auth.state';

export const authReducer = createReducer(

  initialAuthState,

  on(AuthActions.loginLoaded, (state)=>({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.loginSuccess, (state, {userDetail})=>({
    ...state,
    loading: false,
    userDetail,
    
  })),

  on(AuthActions.loginError, (state, {error})=>({
    ...state,
    loading: false,
    error: error
  }))

);