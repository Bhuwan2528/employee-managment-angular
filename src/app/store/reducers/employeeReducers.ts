import { createReducer, on } from "@ngrx/store";
import * as EmployeeActions from '../actions/employee.action'
import { initialEmployeePaginationState } from "../state/employee.state";

export const EmployeePaginationReducer = createReducer(

    initialEmployeePaginationState,

    on(EmployeeActions.setEmployeePagination, (state, { pagination }) => ({
        ...state,
        ...pagination
    }))

)
