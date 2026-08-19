  import { createAction, props } from "@ngrx/store";
import { LeaveRequest, LeaveServerResponse } from "../../core/models/leaves.model";

export const loadLeaves = createAction(
    '[leaves] leaves loaded'
)

export const loadLeavesSuccesfully = createAction(
    '[leaves] leaves loaded succesfully',
    props<{leaves: LeaveServerResponse[]}>()
)

export const loadLeavesFaliure = createAction(
    '[leaves] loaded failed',
    props<{error: string}>()
)

// =====================approveLeave===============================

export const approveLeave = createAction(
  '[leaves] approve leave',
  props<{ id: string }>()
);

export const approveLeaveSuccessfully = createAction(
  '[leaves] approve leave successfully',
  props<{ leave: LeaveServerResponse }>()
);

export const approveLeaveFailure = createAction(
  '[leaves] approve leave failure',
  props<{ error: string }>()
);


// ======================rejectLeave=========================

export const rejectLeave = createAction(
  '[leaves] reject leave',
  props<{ id: string }>()
);

export const rejectLeaveSuccessfully = createAction(
  '[leaves] reject leave successfully',
  props<{ leave: LeaveServerResponse }>()
);

export const rejectLeaveFailure = createAction(
  '[leaves] reject leave failure',
  props<{ error: string }>()
);


// =======================addleaves===================================

export const addLeave = createAction(
  '[leaves] leaves added',
  props<{request: LeaveRequest}>()
)

export const addLeaveSuccesfully = createAction(
  '[leaves] leaves added succesfully',
  props<{leave: LeaveServerResponse}>()
)

export const addLeaveFaliure = createAction(
  '[leaves] leaved added failed',
  props<{error: string}>()
)

// ============================userleaves===================================

export const userLeaves = createAction(
  '[leaves] user leave loaded'
)

export const userLeavesSuccesful = createAction(
  '[leaves] user leave loaded succesfully',
  props<{userLeaves: LeaveServerResponse[]}>()
)

export const userLeavesFaliure = createAction(
  '[leaves] user leave loaded failed', 
  props<{error: string}>()
)