import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeeState } from "../state/employee.state";

export const selectEmployeeState = createFeatureSelector<EmployeeState>('employee')

export const selectEmployees = createSelector(selectEmployeeState, (state)=> state.employees)

export const selectEmployeeLoading = createSelector(selectEmployeeState, (state)=> state.loading)

export const selectEmployeeError = createSelector(selectEmployeeState, (state)=> state.error)