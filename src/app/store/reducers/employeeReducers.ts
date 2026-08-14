import { createReducer, on } from "@ngrx/store";
import {initialEmployeeState, EmployeeState} from '../state/employee.state'
import * as EmployeeActions from '../actions/employee.action'

export const EmployeeReducer = createReducer(

    initialEmployeeState,

    //Load Employees

    on(EmployeeActions.addEmployee, (state): EmployeeState=>({
        ...state,
        loading: true,
    })),

    on(EmployeeActions.loadEmployeesSuccesfully, (state, {employees}): EmployeeState=>({
        ...state,
        employees,
        loading: false,
        error: null
    })),

    on(EmployeeActions.loadEmployeesFaliure, (state, {error})=>({
        ...state,
        loading: false,
        error
    })),





    //=======================addEmployee==============================

    on(EmployeeActions.addEmployee, (state)=>({
        ...state,
        loading: true,
        error: null
    })),

    on(EmployeeActions.addEmployeeSuccesfully, (state, {employee})=>({
        ...state,
        loading: false,
        error: null,
        employees : [...state.employees, employee]
    })),

    on(EmployeeActions.addEmployeefaliure, (state, {error})=>({
        ...state,
        error
    })),



    // =================updateEmployee==================================


    on(EmployeeActions.updateEmployee, (state)=>({
        ...state,
        loading: true,
    })),

    on(EmployeeActions.updateEmployeeSuccesfully, (state, {employee})=>({
        ...state,
        loading: false,
        error: null,
        employee : state.employees.map((emp)=> emp.id == employee.id ? employee : emp )
    })),

    on(EmployeeActions.updateEmployeeFaliure, (state, {error})=>({
        ...state,
        loading: false,
        error
    })),


    // =============================deleteEmployee===============================


    on(EmployeeActions.deleteEmployee, (state)=>({
        ...state,
        loading: true,
        error: null
    })),

    on(EmployeeActions.deleteEmployeeSuccesful, (state, {id})=>({
        ...state,
        loading: false,
        error: null,
        employees: state.employees.filter((emp)=> emp.id !== id)
    })),

    on(EmployeeActions.deleteEmployeeFaliure, (state, {error})=>({
        ...state,
        loading: false,
        error
    })),


    // ============================upadterole=================================


    on(EmployeeActions.updateRoleEmployee, (state)=>({
        ...state,
        loading: true
    })),

    on(EmployeeActions.updateRoleEmployeeSuccesfully, (state, {employee})=>({
        ...state,
        loading: false,
        error: null,
        employee : state.employees.map((emp)=> emp.id == employee.id ? employee : emp )
    })),

    on(EmployeeActions.updateRoleEmployeeFaliure, (state, {error})=>({
        ...state,
        loading: false,
        error
    })),

)
