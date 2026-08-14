import { createAction, props } from "@ngrx/store";
import { AttendanceServerResponse } from "../../core/models/attendance.model";

export const checkin = createAction(
    '[checkin] checkin Loaded'
)

export const checkinSuccesfully = createAction(
    '[checkin] checkin sucsfull',
    props<{attendance: AttendanceServerResponse}>()
)

export const checkinFaliure = createAction(
    '[checkin] checkin failed',
    props<{error: string}>()
)


// =======================checkout==========================


export const checkout = createAction(
    '[checkout] checkout Loaded'
)

export const checkoutSuccesfully = createAction(
    '[checkout] checkout sucsfull',
    props<{attendance: AttendanceServerResponse}>()
)

export const checkoutFaliure = createAction(
    '[checkout] checkout failed',
    props<{error: string}>()
)


// ======================userList=============================

export const loadUserAttendance = createAction(
    '[user attendance list] user list loaded'
)

export const loadUserAttendanceSucccesful = createAction(
    '[user attendance list] user list succesful',
    props<{userList: AttendanceServerResponse[]}>()
)

export const loadUserAttendanceFaliure = createAction(
    '[user attendance list] loadUserAttendance failed',
    props<{error: string}>()
)


// =========================selecteduserattnadabce==================


export const selectedUserAttendance = createAction(
    '[selected user] attendace selected user loaded',
    props<{id: string}>()
)

export const selectedUserAttendanceSuccesfull = createAction(
    '[selcetd user] selected user attendance succesful',
    props<{selectedUserList: AttendanceServerResponse[]}>()
)

export const selectedUserAttendanceFaliure = createAction(
    '[selected user] seleceted user attendance failed',
    props<{error: string}>()
)