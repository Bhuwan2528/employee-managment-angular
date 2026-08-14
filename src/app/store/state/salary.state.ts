import { SalaryServerResponse } from "../../core/models/payroll.model";

export interface SalaryState{
    salary: SalaryServerResponse[];
    lastPaid: SalaryServerResponse | null;

    particularEmployeeSalary: SalaryServerResponse[];
    particularEmployeeLastpaid: SalaryServerResponse | null;
    loading: boolean;
    error: string | null
}

export const initialSalaryState: SalaryState = {
    salary: [],
    lastPaid: null,

    particularEmployeeSalary: [],
    particularEmployeeLastpaid: null,
    loading: false,
    error: null
}