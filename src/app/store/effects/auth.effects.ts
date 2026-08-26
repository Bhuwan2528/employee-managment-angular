import { inject, Injectable } from "@angular/core";
import * as AuthActions from '../actions/auth.actions'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../modules/auth/services/auth-service/auth-service";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { ToastService } from "../../core/services/toast.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthEffects{
    action$ = inject(Actions);
    authService = inject(AuthService);
    toast = inject(ToastService)
    router = inject(Router)

    loadLogin$ = createEffect(()=>
        this.action$.pipe(
            ofType(AuthActions.loginLoaded),
            mergeMap(({request})=>
                this.authService.login(request).pipe(

                    tap((userDetail)=>{
                        localStorage.setItem('accessToken',  userDetail.accessToken );
                        localStorage.setItem('user', JSON.stringify(userDetail.user));
                    }),

                    map((userDetail)=>{ 
                        this.authService.setTokenRefresh()
                        return AuthActions.loginSuccess({userDetail})
                    }),
                    catchError((error)=>
                        of(AuthActions.loginError({ error: error.error?.message ?? 'something Went Wrong'}))
                    )
                )
            )
        )
)

    loadLogout$ = createEffect(()=>
        this.action$.pipe(
            ofType(AuthActions.logoutLoaded),
            mergeMap(()=>
                this.authService.logout().pipe(
                    map(()=>{
                        localStorage.clear();
                        return AuthActions.logoutSuccess()
                    })
                )
            )
        )
    )
}