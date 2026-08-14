import { createReducer, on } from "@ngrx/store";
import { initialLeaveState, LeaveState } from "../state/leave.state";
import * as LeaveActions from '../actions/leave.actions'

export const leaveReducer = createReducer(
    initialLeaveState,

    on(LeaveActions.loadLeaves, (state)=>({
        ...state,
        loading: true,
        error: null
    })),

    on(LeaveActions.loadLeavesSuccesfully, (state, {leaves}):LeaveState =>({
        ...state, 
        loading: false,
        error: null,
        leaves,
    })),

    on(LeaveActions.loadLeavesFaliure, (state, {error})=>({
        ...state,
        error,
        loading: false
    })),



    on(LeaveActions.approveLeaveSuccessfully, (state, {leave})=>({
        ...state,
        leaves: state.leaves.filter((item)=> item.id !== leave.id)
    })),

    on(LeaveActions.rejectLeaveSuccessfully, (state, {leave})=>({
        ...state,
        leaves: state.leaves.filter((item)=> item.id !== leave.id)
    })),




    on(LeaveActions.addLeave, (state)=>({
        ...state,
        loading: true,
        error: null
    })),

    on(LeaveActions.addLeaveSuccesfully, (state, {leave})=>({
        ...state,
        loading: false,
        error: null, 
        leaves: [...state.leaves, leave]
    })),

    on(LeaveActions.addLeaveFaliure, (state, {error}): LeaveState=>({
        ...state,
        loading: false,
        error 
    })),



    on(LeaveActions.userLeaves, (state)=>({
        ...state,
        loading: true,
        error: null
    })),

    on(LeaveActions.userLeavesSuccesful, (state, {userLeaves}):LeaveState =>({
        ...state, 
        loading: false,
        error: null,
        userLeaves,
    })),

    on(LeaveActions.userLeavesFaliure, (state, {error})=>({
        ...state,
        error,
        loading: false
    })),
    
)