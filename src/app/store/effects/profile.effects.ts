import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProfileService } from "../../core/services/profile.service";
import { updateProfileAction, updateProfileActionFaliure, updateProfileActionSuccesfully } from "../actions/profile.action";
import { catchError, map, mergeMap, of } from "rxjs";

Injectable({
    providedIn: 'root'
})

export class ProfileEffects{

    action$ = inject(Actions)
    profileService = inject(ProfileService)

    updateProfile$ = createEffect(()=>
        this.action$.pipe(
            ofType(updateProfileAction),
            mergeMap(({request})=>
                this.profileService.updateProfile(request).pipe(
                    map((profile)=>
                        updateProfileActionSuccesfully({profile})
                    ),
                    catchError((error)=>
                        of(updateProfileActionFaliure({error: error.error.message ?? 'something went wrong'}))
                    )
                )
            )
        )
    )
}