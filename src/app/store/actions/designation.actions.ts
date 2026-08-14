import { createAction, props } from "@ngrx/store";
import { DesignationRequest, DesignationServerResponseDTO } from "../../core/models/designation.model";

export const loadDesignation = createAction(
    '[Designation] Load Designation'
)

export const loadDesignationSuccesful = createAction(
    '[Designation] load designation succesfully',
    props<{designations: DesignationServerResponseDTO[]}>()
)

export const loadDesignationFaliure = createAction(
    '[Designation] load designation faliure',
    props<{error: string}>()
)


//---------------------addDesignation--------------------------

export const addDesignation = createAction(
    '[Designation] add Designation',
    props<{request: DesignationRequest}>()
)

export const addDesignationSuccesful = createAction(
    '[designation] add designation succesfull',
    props<{designation: DesignationServerResponseDTO}>()
)

export const addDesignationFaliure = createAction(
    '[designation] add designation faliure',
    props<{error: string}>()
)

export const updateDesignation = createAction(
    '[Designation] updatwe designation',
    props<{id: string, request: DesignationRequest}>()
)

export const updateDesignationSuccesful = createAction(
    '[Designation] designation updated sucesfully',
    props<{designation: DesignationServerResponseDTO}>()
)

export const updateDesignationFaliure = createAction(
    '[Designation] Designation Faliure',
    props<{error: string}>()
)

export const deleteDesignation = createAction(
    '[Designation] Designation Deleted',
    props<{id: string}>()
)

export const deleteDesignationSuccesful = createAction(
    '[Designation] deleted sucesful',
    props<{id: string}>()
)

export const deleteDesignationFaliure = createAction(
    '[Designation] deletd faliure',
    props<{error: string}>()
)