import { inject, Injectable } from "@angular/core";
import * as AttendanceActions from '../actions/attendance.actions'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AttendanceService } from "../../core/services/attendance.service";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { ToastService } from "../../core/services/toast.service";

@Injectable({
    providedIn: 'root'
})

export class AttendanceEffects{

    action$ = inject(Actions)
    attendanceService = inject(AttendanceService)
    toast = inject(ToastService)

    // Refreshes the list only after the mutation genuinely succeeds -- dispatching
    // loadUserAttendance separately (e.g. from the component, right after checkin())
    // races the mutation itself and can load stale pre-checkin/checkout data.
    checkin$ = createEffect(()=>
        this.action$.pipe(
            ofType(AttendanceActions.checkin),
            mergeMap(()=>
                this.attendanceService.checkin().pipe(
                    switchMap((attendance)=>{
                        this.toast.success('Checked In')
                        return [
                            AttendanceActions.checkinSuccesfully({attendance}),
                            AttendanceActions.loadUserAttendance(),
                        ]
                    }),
                    catchError((error)=>
                        of(AttendanceActions.checkinFaliure({error: error.error?.message ?? 'something went wrong'}))
                    )
                )
            )
        )
    )

    checkout$ = createEffect(()=>
        this.action$.pipe(
            ofType(AttendanceActions.checkout),
            mergeMap(()=>
                this.attendanceService.checkout().pipe(
                    switchMap((attendance)=>{
                        this.toast.success('Checked Out')
                        return [
                            AttendanceActions.checkoutSuccesfully({attendance}),
                            AttendanceActions.loadUserAttendance(),
                        ]
                    }),
                    catchError((error)=>
                        of(AttendanceActions.checkoutFaliure({error: error.error?.message ?? 'something went wrong'}))
                    )
                )
            )
        )
    )

    userList$ = createEffect(()=>
        this.action$.pipe(
            ofType(AttendanceActions.loadUserAttendance),
            mergeMap(()=>
                this.attendanceService.userAttendance().pipe(
                    map((userList)=>
                        AttendanceActions.loadUserAttendanceSucccesful({userList})
                    ),
                    catchError((error)=>
                        of(AttendanceActions.loadUserAttendanceFaliure({error: error.error?.message ?? 'something went wrong'}))
                    )
                )
            )
        )
    )

    selectedUserList$ = createEffect(()=>
        this.action$.pipe(
            ofType(AttendanceActions.selectedUserAttendance),
            mergeMap(({month, year, id})=>
                this.attendanceService.selectedUserAttendance(month, year, id).pipe(
                    map((selectedUserList)=>
                        AttendanceActions.selectedUserAttendanceSuccesfull({selectedUserList})
                    ),
                    catchError((error)=>
                        of(AttendanceActions.selectedUserAttendanceFaliure({error: error.error?.message ?? 'something went wrong '}))
                    )
                )
            )
        )
    )


    downloadAttendance$ = createEffect(()=>
        this.action$.pipe(
            ofType(AttendanceActions.downloadFile),
            mergeMap(({empId})=>
                this.attendanceService.downloadFile(empId).pipe(
                    map((file)=>{
                        this.toast.success('Attendance File Downloaded')
                       return AttendanceActions.downloadFileSuccesfully({file})
                    })
                )
            ),
            catchError((error)=>
                of(AttendanceActions.downloadFileFailed({error: error.error.message ?? 'something went wrong'}))
            )
        )
    )
    
}