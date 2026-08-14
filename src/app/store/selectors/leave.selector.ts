import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LeaveState } from "../state/leave.state";

export const stateLeaveSelector = createFeatureSelector<LeaveState>('leave')

export const selectLeave = createSelector(stateLeaveSelector, (state)=> state.leaves)

export const selectLeaveLoading = createSelector(stateLeaveSelector, (state)=> state.loading)

export const sleectLeaveError = createSelector(stateLeaveSelector, (state)=>state.error)

export const selectUserLeaves = createSelector( stateLeaveSelector, (state)=> state.userLeaves)