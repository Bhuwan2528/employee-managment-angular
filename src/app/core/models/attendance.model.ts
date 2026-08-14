import { EmployeeServerResponse } from "./emloyee.model";

export interface AttendanceServerResponse {
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
}