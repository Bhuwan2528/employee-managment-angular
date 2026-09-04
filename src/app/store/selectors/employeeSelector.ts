import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeePagination } from '../../core/models/emloyee.model';

export const selectEmployeePaginationState =
  createFeatureSelector<EmployeePagination>('employeePagination');

export const selectEmployeesPagination = createSelector(
  selectEmployeePaginationState,
  (state) => state
);