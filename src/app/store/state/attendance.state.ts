import { AttendanceServerResponse, data } from "../../core/models/attendance.model";

export interface AttendanceState{
    userList: data[]
    selectedUserList: AttendanceServerResponse | null 
    attendance : AttendanceServerResponse| null;
    loading: boolean;
    error: string | null
}

export const initialAttendanceState: AttendanceState = {
    userList: [],
    selectedUserList: null,
    attendance: null,
    loading: false,
    error: null
}