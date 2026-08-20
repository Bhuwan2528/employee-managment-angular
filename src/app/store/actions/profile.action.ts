import { createAction, props } from "@ngrx/store";
import { ProfileRequest, ProfileServerResponse } from "../../core/models/profile.model";

export const updateProfileAction = createAction(
    '[proflile] profile updated started',
    props<{request: ProfileRequest}>()
)

export const updateProfileActionSuccesfully = createAction(
    '[proflile] profile updated succesfull',
    props<{profile: ProfileServerResponse}>()
)

export const updateProfileActionFaliure = createAction(
    '[proflile] profile updated succesfull',
    props<{request: ProfileRequest}>()
)

