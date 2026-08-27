import { inject, Injectable } from "@angular/core";
import * as DesignationActions from '../actions/designation.actions'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DesignationService } from "../../core/services/designation.service";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { ToastService } from "../../core/services/toast.service";

@Injectable()
export class DesignationEffects{

    private action$ = inject(Actions)
    private designationService = inject(DesignationService)
    toast = inject(ToastService)

    loadDesignation$ = createEffect(()=>
        this.action$.pipe(
            ofType(DesignationActions.loadDesignation),
            mergeMap(()=>
                this.designationService.getDesignation().pipe(
                    map((designations)=> DesignationActions.loadDesignationSuccesful({designations})),
                    catchError((error)=>
                        of(DesignationActions.loadDesignationFaliure({error: error.error?.message ?? 'something went wrong'}))
                    )
                )
            )
        )
    )
    

    addDesignation$ = createEffect(()=>
        this.action$.pipe(
            ofType(DesignationActions.addDesignation),
            mergeMap(({request})=>
                this.designationService.addDesignation(request).pipe(
                    map((designation)=>DesignationActions.addDesignationSuccesful({designation})),
                    catchError((error)=>
                    of(DesignationActions.addDesignationFaliure({error: error.error?.message ?? 'something went wrong'}))),
                )
            ),
            tap(()=>{
                this.toast.success('Designation Added Successfully')
            })
        )

    )

    updateDesignation$ = createEffect(()=>
    this.action$.pipe(
        ofType(DesignationActions.updateDesignation),
        mergeMap(({id, request})=> 
            this.designationService.updateDesignation(id, request).pipe(
                map((designation)=> DesignationActions.updateDesignationSuccesful({designation})),
                catchError((error)=>
                of(DesignationActions.updateDesignationFaliure({error : error.error?.message ?? 'something went wrong'})
            )
            )
            )
        )
    )
)

    deleteDesignation$ = createEffect(()=>
        this.action$.pipe(
            ofType(DesignationActions.deleteDesignation),
            mergeMap(({id})=>
            this.designationService.deleteDesignation(id).pipe(
            map((designation)=> DesignationActions.deleteDesignationSuccesful({id})),
            catchError((error)=> 
            of(DesignationActions.deleteDesignationFaliure({error: error.error?.message ?? 'something went wrong'})))
            )
        )
        )
    )

}