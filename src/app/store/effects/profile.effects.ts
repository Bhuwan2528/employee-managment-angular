// import { inject, Injectable } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { ProfileService } from "../../core/services/profile.service";
// import { updateProfileAction } from "../actions/profile.action";
// import { map, mergeMap } from "rxjs";

// Injectable({
//     providedIn: 'root'
// })

// export class ProfileEffects{

//     action$ = inject(Actions)
//     profileService = inject(ProfileService)

//     updateProfile$ = createEffect(()=>
//         this.action$.pipe(
//             ofType(updateProfileAction),
//             mergeMap(({request})=>
//                 this.profileService.updateProfileURL(request).pipe(

//                 )
//             )
//         )
//     )
// }