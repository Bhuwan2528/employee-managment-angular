import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AttendanceState } from "../state/attendance.state";

export const AttendanceSelectorState = createFeatureSelector<AttendanceState>(('attendance'))

export const selectAttendance = createSelector(AttendanceSelectorState, (state)=> state.attendance)

export const selectAttendanceLoading = createSelector(AttendanceSelectorState, (state)=> state.loading)

export const selectAttendanceError = createSelector(AttendanceSelectorState, (state)=> state.error)

export const selectUserAttendanceList = createSelector(AttendanceSelectorState, (state)=> state.userList)

export const selectedSelectedUserList = createSelector(AttendanceSelectorState, (state)=>state.selectedUserList)

