import { EmployeeServerResponse } from "./emloyee.model";

export interface AttendanceServerResponse {
    summary?: summary
    data: data[]
}

export interface summary {
    workingDays: number;
    present: number;
    absent: number;
    leave: number;
}

export interface data {
    id:         string;
    employeeId: string;
    date:       Date;
    checkIn:    Date|null;
    checkOut:   Date|null;
    status:     string;
    createdAt:  Date;
    updatedAt:  Date;
    createdBy:  null;
    updatedBy:  null;
    employee:   EmployeeServerResponse;
    workingDuration: number
}