import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as LeavesActions from '../actions/leave.actions'
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { LeaveService } from "../../core/services/leave.service";
import { ToastService } from "../../core/services/toast.service";

@Injectable({
    providedIn: 'root'
})

export class LeavesEffects{

    private action$ = inject(Actions)
    private leaveService = inject(LeaveService)
    private toast = inject(ToastService)

loadLeaves$ = createEffect(()=>
    this.action$.pipe(
        ofType(LeavesActions.loadLeaves),
        mergeMap(()=>
            this.leaveService.getAllLeaves().pipe(
                map((leaves)=> LeavesActions.loadLeavesSuccesfully({leaves})),
                catchError((error)=>
                of(LeavesActions.loadLeavesFaliure({error: error.error?.message ?? 'something went wrong'}))
            )
            )
        )
    )
)

approveLeave$ = createEffect(()=>
this.action$.pipe(
    ofType(LeavesActions.approveLeave),
    mergeMap(({id})=>
        this.leaveService.ApproveLeave(id).pipe(
            map((leave)=>
                LeavesActions.approveLeaveSuccessfully({leave})
            ),
            catchError((error)=>
            of(LeavesActions.approveLeaveFailure({
                error: error.error?.message ?? 'something went wromg'
            })))
        )
    ), 
    tap(()=>{
        this.toast.success('Leave Approved')
    })
)
)

rejectLeave$ = createEffect(()=>
    this.action$.pipe(
        ofType(LeavesActions.rejectLeave),
        mergeMap(({id})=>
            this.leaveService.RejectLeave(id).pipe(
                map((leave)=> LeavesActions.rejectLeaveSuccessfully({leave})),
                catchError((error)=>
                of(LeavesActions.rejectLeaveFailure({
                    error: error.error?.message ?? 'something went wrong'
                })))
            )
        ), 
        tap(()=>{
            this.toast.success('Leave Rejected')
        })
    )
)


addLeaves$ = createEffect(()=>
this.action$.pipe(
    ofType(LeavesActions.addLeave),
    mergeMap(({request})=>
        this.leaveService.createLeave(request).pipe(
            map((leave)=>
                LeavesActions.addLeaveSuccesfully({leave})
            ),
            catchError((error)=>
            of(LeavesActions.addLeaveFaliure({error: error.error?.message ?? 'something went wrong'})))
        )
    ), 
    tap(()=>{
        this.toast.success('Leave Requested')
    })
)
)

reloadLeavesAfterAdd = createEffect(()=>
this.action$.pipe(
    ofType(LeavesActions.addLeaveSuccesfully),
    mergeMap(()=>[
        LeavesActions.loadLeaves(),
        LeavesActions.userLeaves()
    ])
)
)

userLeave$ = createEffect(()=>
this.action$.pipe(
    ofType(LeavesActions.userLeaves),
    mergeMap(()=>
        this.leaveService.getuserLeaves().pipe(
            map((userLeaves)=>
                LeavesActions.userLeavesSuccesful({userLeaves})
            ),
            catchError((error)=>
                of(LeavesActions.userLeavesFaliure({error: error.error?.message ?? 'something went wrong'}))
            )
        )
    )
))

}