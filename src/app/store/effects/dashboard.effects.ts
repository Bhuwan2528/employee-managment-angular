import { inject, Injectable } from "@angular/core";
import * as DashboardActions from '../actions/dashboard.actions'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DashboardService } from "../../core/services/dashboard.service";
import { catchError, map, mergeMap, of } from "rxjs";
import { checkinSuccesfully } from "../actions/attendance.actions";

@Injectable({
    providedIn: 'root'
})

export class DashboardEffects{
    action$ = inject(Actions)
    dashboardService = inject(DashboardService)

loadDashboard$ = createEffect(()=>
    this.action$.pipe(
        ofType(DashboardActions.loadDashboard),
        mergeMap(()=>
            this.dashboardService.getDashboard().pipe(
                map((dashboard)=>
                    DashboardActions.loadDashboardSuccesful({dashboard})
                ),
                catchError((error)=>
                    of(DashboardActions.loadDashboardFaliure({error: error.error?.message ?? 'something went wrong'}))
                )
            )
        )
    )
)

loadAdminDashboardOnEmployeeCheckin$ = createEffect(()=>
    this.action$.pipe(
        ofType(checkinSuccesfully),
        map(()=> DashboardActions.loadDashboard())
    )
)

}