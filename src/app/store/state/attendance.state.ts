import { AttendanceServerResponse } from "../../core/models/attendance.model";

export interface AttendanceState{
    userList: AttendanceServerResponse[]
    selectedUserList: AttendanceServerResponse[] 
    attendance : AttendanceServerResponse| null;
    loading: boolean;
    error: string | null
}

export const initialAttendanceState: AttendanceState = {
    userList: [],
    selectedUserList: [],
    attendance: null,
    loading: false,
    error: null
}