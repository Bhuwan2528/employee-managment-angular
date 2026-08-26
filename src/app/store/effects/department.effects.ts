import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as DepartmentActions from '../actions/deapartment.actions';
import { DepartmentService } from '../../core/services/department.service';
import { tap } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';


@Injectable()
export class DepartmentEffects {

  private actions$ = inject(Actions);
  private departmentService = inject(DepartmentService);
  toast = inject(ToastService)


loadDepartments$ = createEffect(() =>
  this.actions$.pipe(
    ofType(DepartmentActions.loadDepartments),

    mergeMap(() =>
      this.departmentService.getDepartments().pipe(
        map((departments) =>
          DepartmentActions.loadDepartmentsSuccess({ departments })
        ),
        catchError((error) =>
          of(
            DepartmentActions.loadDepartmentsFailure({
              error: error.error?.message ?? 'Something went wrong'
            })
          )
        )
      )
    )
  )
);


addDepartment$ = createEffect(() =>
  this.actions$.pipe(
    ofType(DepartmentActions.addDepartment),
    mergeMap(({ request }) =>
      this.departmentService.addDepartment(request).pipe(
        map((department) =>{
          this.toast.success('Department Added Succesfully')
          return DepartmentActions.addDepartmentSuccess({ department })
        }),
        catchError((error) =>
          of(
            DepartmentActions.addDepartmentFailure({
              error: error.error?.message ?? 'Something went wrong'
            })
          )
        )
      )
    )
  )
);


updateDepartment$ = createEffect(() =>
  this.actions$.pipe(
    ofType(DepartmentActions.updateDepartment),
    mergeMap(({ id, request }) =>
      this.departmentService.updateDepartment(id, request).pipe(
        map((department) =>{
          this.toast.success('Department Updated Succesfully')
          return DepartmentActions.updateDepartmentSuccess({ department })
        }),
        catchError((error) =>
          of(
            DepartmentActions.updateDepartmentFailure({
              error: error.error?.message ?? 'Something went wrong'
            })
          )
        )
      )
    ),
    tap(()=>{
      this.toast.success('Designation Updated Succesfully')
    })
  )
);


deleteDepartment$ = createEffect(() =>
  this.actions$.pipe(
    ofType(DepartmentActions.deleteDepartment),
    mergeMap(({ id }) =>
      this.departmentService.deleteDepartment(id).pipe(
        map((department) =>{
          this.toast.success('Department Deleted Succesfully')
          return DepartmentActions.deleteDepartmentSuccess({ id })
        }),
        catchError((error) =>
          of(
            DepartmentActions.deleteDepartmentFailure({
              error: error.error?.message ?? 'Something went wrong'
            })
          )
        )
      )
    ),
  )
);

}