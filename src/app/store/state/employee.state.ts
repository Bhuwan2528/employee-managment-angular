import { EmployeePagination, EmployeeServerResponse } from "../../core/models/emloyee.model";

export interface EmployeeState{
    employees: EmployeeServerResponse[],
    pagination: EmployeePagination | null
    loading: boolean,
    error: string|null
}
export const initialEmployeeState: EmployeeState ={
    employees: [],
    pagination: null,
    loading: false,
    error: null
}