import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { checkinSuccesfully, checkoutSuccesfully, loadUserAttendanceSucccesful, selectedUserAttendanceSuccesfull } from "../actions/attendance.actions";
import { loadDashboardSuccesful } from "../actions/dashboard.actions";
import { addDepartmentSuccess, deleteDepartmentSuccess, loadDepartmentsSuccess, updateDepartmentSuccess } from "../actions/deapartment.actions";
import { addDesignationSuccesful, deleteDesignationSuccesful, loadDesignationSuccesful, updateDesignationSuccesful } from "../actions/designation.actions";
import { addLeaveSuccesfully, approveLeaveSuccessfully, loadLeavesSuccesfully, rejectLeaveSuccessfully, userLeavesSuccesful } from "../actions/leave.actions";
import { AddEmployeeSalarySuccesful, loadEmployeeLastpaidByAdminSuccesful, loadEmployeeLastpaidSuccesful, loadEmployeeSalaryByAdminSuccesful, loadEmployeeSalarySuccesful } from "../actions/salary.actions";
import { switchMap, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class GlobalEffects{

    action$ = inject(Actions)

    reloadOnSuccess$ = createEffect(()=>
        this.action$.pipe(
            ofType(checkinSuccesfully, checkoutSuccesfully,
            addDepartmentSuccess, updateDepartmentSuccess, deleteDepartmentSuccess,
            addDesignationSuccesful, updateDesignationSuccesful, deleteDesignationSuccesful, 
            approveLeaveSuccessfully, rejectLeaveSuccessfully, addLeaveSuccesfully, userLeavesSuccesful, 
            AddEmployeeSalarySuccesful,
            ),
            switchMap(()=>[
                
            ])
        ),
        {dispatch: false}
    )
    
}