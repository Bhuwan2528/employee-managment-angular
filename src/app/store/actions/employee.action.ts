import { createAction, props } from "@ngrx/store";
import { EmployeePagination, EmployeeRequest, employeeRoleRequest, EmployeeServerResponse, EmployeeUpdateRequest } from "../../core/models/emloyee.model";

export const loadEmployees = createAction(
    '[Employees] employees loaded',
    props<{page?: number; limit?: number}>()
)

export const loadEmployeesSuccesfully = createAction(
    '[Employees] employe loaded succesfully',
    props<{employees: EmployeeServerResponse[], pagination: EmployeePagination}>()
)

export const loadEmployeesFaliure = createAction(
    '[Employees] employes loaded faliure',
    props<{error: string}>()
)

//   ---------------------addEployee----------------------

export const addEmployee = createAction(
    '[Employees] Employe Added',
    props<{request: EmployeeRequest}>()
)

export const addEmployeeSuccesfully = createAction(
    '[employee] employee added succesfully',
    props<{employee: EmployeeServerResponse}>()
)

export const addEmployeefaliure = createAction(
    '[employees] employee added succesfully',
    props<{error: string}>()
)


// ------------------updateEmployee---------------------

export const updateEmployee = createAction(
    '[employees] employee update',
    props<{id: string | undefined, request: EmployeeUpdateRequest}>()
)

export const updateEmployeeSuccesfully = createAction(
    '[employee] employee updated succesfully',
    props<{employee: EmployeeServerResponse}>()
)

export const updateEmployeeFaliure = createAction(
    '[employee] employee update faliure',
    props<{error: string}>()
)


// ========================deleteEmployee===========================

export const deleteEmployee = createAction(
    '[employee] employee delete',
    props<{id: string}>()
)

export const deleteEmployeeSuccesful = createAction(
   ' [employee] employee delted succesfully',
   props<{id: string}>()
)

export const deleteEmployeeFaliure = createAction(
    '[employee] employee deleted sucessfully',
    props<{error: string}>()
)



// =========================role employee =======================


export const updateRoleEmployee = createAction(
    '[employees] employee role update',
    props<{request: employeeRoleRequest}>()
)

export const updateRoleEmployeeSuccesfully = createAction(
    '[employee] employee role updated succesfully',
    props<{employee: EmployeeServerResponse}>()
)

export const updateRoleEmployeeFaliure = createAction(
    '[employee] employee role update faliure',
    props<{error: string}>()
)


// ----------------------------bulk add users--------------------------------

export const addBulkEmployee = createAction(
    '[Bulk Employees] Employe Added',
    props<{request: EmployeeRequest[]}>()
)

export const addBulkEmployeeSuccesfully = createAction(
    '[Bulk employee] employee added succesfully',
    props<{employees: EmployeeServerResponse[]}>()
)

export const addBulkEmployeefaliure = createAction(
    '[Bulk employees] employee added succesfully',
    props<{error: string}>()
)

