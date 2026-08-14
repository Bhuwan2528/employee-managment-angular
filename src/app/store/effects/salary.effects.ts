import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SalaryService } from "../../core/services/salary.service";
import * as SalaryActions from '../actions/salary.actions'
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { ToastService } from "../../core/services/toast.service";

@Injectable({
    providedIn: 'root'
})

export class SalaryEffects{
    action$ = inject(Actions)
    salaryService = inject(SalaryService)
    toast = inject(ToastService)


    loadEmployeeSalary$ = createEffect(()=>
        this.action$.pipe(
            ofType(SalaryActions.loadEmployeeSalary),
            mergeMap(()=>
                this.salaryService.getEmployeeSalary().pipe(
                    map((salary)=>
                        SalaryActions.loadEmployeeSalarySuccesful({salary})
                    ),
                    catchError((error)=>
                        of(SalaryActions.loadEmployeeSalaryFaliure({
                            error: error.error.message ?? 'something went wrong'
                        }))
                    )
                )
            )
        )
    )

    loadEmployeeLastpaid$ = createEffect(()=>
        this.action$.pipe(
            ofType(SalaryActions.loadEmployeeLastpaid),
            mergeMap(()=>
                this.salaryService.getEmployeeLastpaid().pipe(
                    map((lastPaid)=>
                        SalaryActions.loadEmployeeLastpaidSuccesful({lastPaid})
                    ),
                    catchError((error)=>
                        of(SalaryActions.loadEmployeeLastpaidFaliure({
                            error: error.error.message ?? 'something went wrong'
                        }))
                    )
                )
            )
        )
    )


    loadEmployeeSalaryByAdmin$ = createEffect(()=>
        this.action$.pipe(
            ofType(SalaryActions.loadEmployeeSalaryByAdmin),
            mergeMap(({id})=>
                this.salaryService.getSalaryPerEmployee(id).pipe(
                    map((particularEmployeeSalary)=>
                        SalaryActions.loadEmployeeSalaryByAdminSuccesful({particularEmployeeSalary})
                    ),
                    catchError((error)=>
                        of(SalaryActions.loadEmployeeSalaryByAdminFaliure({
                            error: error.error.message ?? 'something went wrong'
                        }))
                    )
                )
            )
        )
    )


    loadEmployeeLastpaidByAdmin$ = createEffect(()=>
        this.action$.pipe(
            ofType(SalaryActions.loadEmployeeLastpaidByAdmin),
            mergeMap(({id})=>
                this.salaryService.getLastpaidPerEmployee(id).pipe(
                    map((particularEmployeeLastpaid)=>
                        SalaryActions.loadEmployeeLastpaidByAdminSuccesful({particularEmployeeLastpaid})
                    ),
                    catchError((error)=>
                        of(SalaryActions.loadEmployeeLastpaidByAdminFaliure({
                            error: error.error.message ?? 'something went wrong'
                        }))
                    )
                )
            )
        )
    )


    createSalary$ = createEffect(()=>
        this.action$.pipe(
            ofType(SalaryActions.AddEmployeeSalary),
            mergeMap(({request, id})=>
                this.salaryService.createSalary(request, id).pipe(
                    map((salary)=>
                        SalaryActions.AddEmployeeSalarySuccesful({salary})
                    ),
                    catchError((error)=>
                        of(SalaryActions.AddEmployeeSalaryFaliure({
                            error: error.error.message ?? 'something went wrong'
                        }))
                    )
                )
            )
        )
    )

    addEmployeeSalarySuccessToast = createEffect(()=>
        this.action$.pipe(
        ofType(SalaryActions.AddEmployeeSalarySuccesful),
        tap(() => {
            this.toast.success('Salary Paid');
        })
        ),
    )


}