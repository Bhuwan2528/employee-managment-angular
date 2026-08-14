import { EmployeeServerResponse } from "./emloyee.model";

export interface SalaryServerResponse {
    id:         string;
    employeeId: string;
    basic:      string;
    allowances: string;
    deductions: string;
    netPay:     string;
    month:      number;
    year:       number;
    paidOn:     Date;
    createdAt:  Date;
    updatedAt:  Date;
    createdBy:  string;
    updatedBy:  null;
    employee:   EmployeeServerResponse;
}

export interface SalaryRequest {
    allowances: number;
    deductions: number;
    month:      number;
    year:       number;
}


export interface DATA{
    id: string;
    employee: EmployeeServerResponse
}