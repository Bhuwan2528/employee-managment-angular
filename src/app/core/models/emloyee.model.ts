export interface EmployeeRequest {
    firstName:     string;
    lastName:      string;
    email:         string;
    phone:         string;
    dateOfJoining: string;
    departmentId:  string;
    designationId: string;
    password: string;
    basic: number;
}


export interface EmployeeServerResponse {
    id:            string;
    employeeCode:  string;
    firstName:     string;
    lastName:      string;
    email:         string;
    phone:         string;
    dateOfJoining: Date;
    dateOfBirth:   Date;
    status:        string;
    departmentId:  string;
    designationId: string;
    managerId:     null | string;
    userId:        string;
    createdAt:     Date;
    updatedAt:     Date;
    createdBy:     null;
    updatedBy:     string;
    basic:         number;
    department?:   Department;
    designation?:  Designation;
    manager?:      EmployeeServerResponse;
    user?:         User;
}

export interface Department {
    id:        string;
    name?:     string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: null;
    updatedBy: null | string;
}

export interface Designation {
    id:        string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: null;
    updatedBy: null | string;
    title?:    string;
}

export interface User {
    id:           string;
    email:        string;
    passwordHash: string;
    roleId:       string;
    isActive:     boolean;
    createdAt:    Date;
    updatedAt:    Date;
    createdBy:    null;
    updatedBy:    null;
    role:         Department;
}


export interface EmployeeDialogData {
  mode: 'add' | 'edit';
  employee?: EmployeeServerResponse;
}

export interface EmployeeUpdateRequest {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfJoining: string;
  departmentId:  string;
  designationId: string;
  status: string;
  basic:         number;
}


export interface employeeRoleRequest{
    email: string;
    rolename: string;
}