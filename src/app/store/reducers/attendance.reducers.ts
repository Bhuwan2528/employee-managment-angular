import { createReducer, on } from "@ngrx/store";
import { AttendanceState, initialAttendanceState } from "../state/attendance.state";
import * as AttendanceActions from '../actions/attendance.actions'

export const AttendanceReducer = createReducer(
    initialAttendanceState, 

    on(AttendanceActions.checkin, (state)=> ({
        ...state,
        loading: true
    })),

    on(AttendanceActions.checkinSuccesfully, (state, {attendance})=>({
        ...state,
        loading: false,
        attendance
    })),

    on(AttendanceActions.checkinFaliure, (state, {error})=>({
        ...state,
        loading: false,
        error
    })),


    // =======================checkout=======================================


    on(AttendanceActions.checkout, (state)=> ({
        ...state,
        loading: true
    })),

    on(AttendanceActions.checkoutSuccesfully, (state, {attendance})=>({
        ...state,
        loading: false,
        attendance
    })),

    on(AttendanceActions.checkoutFaliure, (state, {error})=>({
        ...state,
        loading: false,
        error
    })),



    // =======================userAttendance=======================================


    on(AttendanceActions.loadUserAttendance, (state)=> ({
        ...state,
        loading: true
    })),

    on(AttendanceActions.loadUserAttendanceSucccesful, (state, {userList}) : AttendanceState =>({
        ...state,
        loading: false,
        userList
    })),

    on(AttendanceActions.loadUserAttendanceFaliure, (state, {error})=>({
        ...state,
        loading: false,
        error
    })),


    // =====================selectedUserList==========================

    on(AttendanceActions.selectedUserAttendance, (state)=>({
        ...state,
        loading: true,
        selectedUserList: null
    })),

    on(AttendanceActions.selectedUserAttendanceSuccesfull, (state, {selectedUserList})=>({
        ...state,
        loading: false,
        selectedUserList
    })),

    on(AttendanceActions.selectedUserAttendanceFaliure, (state, {error})=>({
        ...state,
        loading: false,
        error
    }))
)