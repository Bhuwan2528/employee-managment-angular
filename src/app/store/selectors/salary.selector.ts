import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SalaryState } from "../state/salary.state";

export const stateSalarySelector = createFeatureSelector<SalaryState>('salary');

export const selectEmployeeSalary = createSelector(stateSalarySelector, (state)=> state.salary);

export const selectEmployeeLastPaid = createSelector(stateSalarySelector, (state)=> state.lastPaid);

export const selectSalaryLoading = createSelector(stateSalarySelector, (state)=> state.loading);

export const selectSalaryError = createSelector(stateSalarySelector, (state)=> state.error);

export const selectParticularEmployeeSalary = createSelector(stateSalarySelector, (state)=> state.particularEmployeeSalary);

export const selectParticularEmployeeLastPaid = createSelector(stateSalarySelector, (state)=> state.particularEmployeeLastpaid);