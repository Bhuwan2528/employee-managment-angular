import { createReducer, on } from '@ngrx/store';
import * as SalaryActions from '../actions/salary.actions';
import { initialSalaryState, SalaryState } from '../state/salary.state';

export const salaryReducer = createReducer(
  initialSalaryState,

  on(SalaryActions.AddEmployeeSalary, (state) => ({
    ...state,
    loading: true,
  })),

  on(SalaryActions.AddEmployeeSalarySuccesful, (state, { salary }): SalaryState => ({
    ...state,
    loading: false,
    error: null,
    salary: [...state.salary, salary],
  })),

  on(SalaryActions.AddEmployeeSalaryFaliure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),



  // ======================== employe lastpaid ================================



  on(SalaryActions.loadEmployeeLastpaid, (state) => ({
    ...state,
    loading: true,
  })),

  on(SalaryActions.loadEmployeeLastpaidSuccesful, (state, { lastPaid }): SalaryState => ({
    ...state,
    loading: false,
    error: null,
    lastPaid
  })),

  on(SalaryActions.loadEmployeeLastpaidFaliure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),



  // ======================== employe salary ================================



  on(SalaryActions.loadEmployeeSalary, (state) => ({
    ...state,
    loading: true,
  })),

  on(SalaryActions.loadEmployeeSalarySuccesful, (state, { salary }): SalaryState => ({
    ...state,
    loading: false,
    error: null,
    salary
  })),

  on(SalaryActions.loadEmployeeSalaryFaliure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),



  // ======================== employe salary by admin  ================================



  on(SalaryActions.loadEmployeeSalaryByAdmin, (state) => ({
    ...state,
    loading: true,
  })),

  on(SalaryActions.loadEmployeeSalaryByAdminSuccesful, (state, { particularEmployeeSalary }): SalaryState => ({
    ...state,
    loading: false,
    error: null,
    particularEmployeeSalary
  })),

  on(SalaryActions.loadEmployeeSalaryByAdminFaliure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),



  // ======================== employe lastpaid by admin ================================



  on(SalaryActions.loadEmployeeLastpaidByAdmin, (state) => ({
    ...state,
    loading: true,
  })),

  on(SalaryActions.loadEmployeeLastpaidByAdminSuccesful, (state, { particularEmployeeLastpaid }): SalaryState => ({
    ...state,
    loading: false,
    error: null,
    particularEmployeeLastpaid  
  })),

  on(SalaryActions.loadEmployeeLastpaidByAdminFaliure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),


);
