import { createAction, props } from "@ngrx/store";
import { SalaryRequest, SalaryServerResponse } from "../../core/models/payroll.model";

export const loadEmployeeSalary = createAction(
    '[Employee Salary] employee salary loaded'
)

export const loadEmployeeSalarySuccesful = createAction(
    '[Employee Salary] employee salary loaded succesfull',
    props<{salary: SalaryServerResponse[]}>()
)

export const loadEmployeeSalaryFaliure = createAction(
    '[Employee Salary] employee salary loaded faliure',
    props<{error: string}>()
)


// ====================EMPLOYEE LASTPAID SELF===========================


export const loadEmployeeLastpaid = createAction(
    '[Employee Lastpaid] employee lastpaid loaded'
)

export const loadEmployeeLastpaidSuccesful = createAction(
    '[Employee Lastpaid] employee lastpaid loaded succesfull',
    props<{lastPaid: SalaryServerResponse}>()
)

export const loadEmployeeLastpaidFaliure = createAction(
    '[Employee Lastpaid] employee lastpaid loaded faliure',
    props<{error: string}>()
)



// ========================= get employee salary by admin ========================


export const loadEmployeeSalaryByAdmin = createAction(
    '[employee salary by admin] employee salary loaded',
    props<{id: string}>()
)

export const loadEmployeeSalaryByAdminSuccesful = createAction(
    '[employee salary by admin] employee salary loaded succesfull',
    props<{particularEmployeeSalary: SalaryServerResponse[]}>()
)

export const loadEmployeeSalaryByAdminFaliure = createAction(
    '[employee salary by admin] employee salary loaded faliure',
    props<{error: string}>()
)


// ============================ get employee lastpaid by admin =======================


export const loadEmployeeLastpaidByAdmin = createAction(
    '[employee lastpaid by admin] employee salary loaded',
    props<{id: string}>()
)

export const loadEmployeeLastpaidByAdminSuccesful = createAction(
    '[employee lastpaid by admin] employee salary loaded succesfull',
    props<{particularEmployeeLastpaid: SalaryServerResponse}>()
)

export const loadEmployeeLastpaidByAdminFaliure = createAction(
    '[employee lastpaid by admin] employee salary loaded faliure',
    props<{error: string}>()
)


// =============================create Salary ==================================


export const AddEmployeeSalary = createAction(
    '[create Salary] employee salary loaded',
    props<{request: SalaryRequest, id:string}>()
)

export const AddEmployeeSalarySuccesful = createAction(
    '[create Salary] employee salary loaded succesfull',
    props<{salary: SalaryServerResponse}>()
)

export const AddEmployeeSalaryFaliure = createAction(
    '[create Salary] employee salary loaded faliure',
    props<{error: string}>()
)