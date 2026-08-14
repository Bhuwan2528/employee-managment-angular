import { EmployeeServerResponse } from "../../core/models/emloyee.model";

export interface EmployeeState{
    employees: EmployeeServerResponse[],
    loading: boolean,
    error: string|null
}
export const initialEmployeeState: EmployeeState ={
    employees: [],
    loading: false,
    error: null
}