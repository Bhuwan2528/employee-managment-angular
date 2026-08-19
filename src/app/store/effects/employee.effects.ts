import { inject, Injectable } from "@angular/core";
import * as EmployeeActions from '../actions/employee.action'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmployeeServices } from "../../core/services/employee.service";
import { ToastComponent } from "../../core/components/toast.component/toast.component";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { ToastService } from "../../core/services/toast.service";

@Injectable()

export class EmployeeEffects{

     action$ = inject(Actions)
     employeeService = inject(EmployeeServices)
     toast = inject(ToastService)

    loadEmployees$ = createEffect(()=>
        this.action$.pipe(
            ofType(EmployeeActions.loadEmployees),

            mergeMap(({page, limit})=>
                this.employeeService.getEmployees(page, limit).pipe(
                    map((response)=> EmployeeActions.loadEmployeesSuccesfully({employees: response.data, pagination: response.pagination})),
                    catchError((error)=>
                        of (EmployeeActions.loadEmployeesFaliure({error: error.error?.message ?? 'something went wrong'}))
                    )
                )
            )
        ))


addEmployee$ = createEffect(()=>
    this.action$.pipe(
        ofType(EmployeeActions.addEmployee),

        mergeMap(({request})=>
            this.employeeService.addEmployee(request).pipe(
                map((employee)=> EmployeeActions.addEmployeeSuccesfully({employee})),
                tap(()=>{
                    this.toast.success('Employee Added Succesfully')
                }),
                catchError((error)=>
                    of (EmployeeActions.addEmployeefaliure({error: error.error?.message ?? 'something went worng'}))
                ),
            )
        )
    )
)

updateEmployee$ = createEffect(()=>
    this.action$.pipe(
        ofType(EmployeeActions.updateEmployee),
        mergeMap(({id, request})=>
            this.employeeService.updateEmployee(request, id).pipe(
                map((employee)=>
                    EmployeeActions.updateEmployeeSuccesfully({employee})
                ),
                catchError((error)=>
                    of(EmployeeActions.updateEmployeeFaliure({error: error.error?.message ?? 'something went wrong'}))
                )
            )
        )
    )
)


deleteEmployee$ = createEffect(()=>
    this.action$.pipe(
        ofType(EmployeeActions.deleteEmployee),
        mergeMap(({id})=>
            this.employeeService.deleteEmployee(id).pipe(
                map(()=>
                    EmployeeActions.deleteEmployeeSuccesful({id})
                ),
                catchError((error)=>
                    of(EmployeeActions.deleteEmployeeFaliure({error: error.error?.message ?? 'something went wrong'}))
                )
            )
        )
    )
)

updateRoleEmployee$ = createEffect(()=>
    this.action$.pipe(
        ofType(EmployeeActions.updateRoleEmployee),
        mergeMap(({request })=>
            this.employeeService.empoyeeRole(request).pipe(
                map((employee)=>
                    EmployeeActions.updateRoleEmployeeSuccesfully({employee})
                ),
                catchError((error)=>
                    of(EmployeeActions.updateRoleEmployeeFaliure({error: error.error.message || 'something went wrong'}))
                )
            )
        )
    )
)


toastSuccessRole$ = createEffect(()=>
    this.action$.pipe(
        ofType(EmployeeActions.updateRoleEmployeeSuccesfully),
        tap(()=>
            this.toast.success('Emplyee Role Updated')
        )
    )
)

}

