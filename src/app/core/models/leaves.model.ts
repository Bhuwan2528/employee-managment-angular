import { EmployeeServerResponse } from "./emloyee.model";

export interface LeaveServerResponse {
    id:         string;
    employeeId: string;
    type:       string;
    startDate:  Date;
    endDate:    Date;
    reason:     string;
    status:     string;
    approvedBy: null;
    createdAt:  Date;
    updatedAt:  Date;
    employee:   EmployeeServerResponse;
}

export interface LeaveRequest{
    type: string;
    startDate: string;
    endDate: string;
    reason: string;
}