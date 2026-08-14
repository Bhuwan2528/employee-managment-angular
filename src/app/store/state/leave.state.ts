import { LeaveServerResponse } from "../../core/models/leaves.model";

export interface LeaveState {
    leaves: LeaveServerResponse[]
    loading: boolean
    error: string | null
    userLeaves: LeaveServerResponse[]
}

export const initialLeaveState: LeaveState = {
    leaves: [],
    loading: false,
    error: null,
    userLeaves: []
}