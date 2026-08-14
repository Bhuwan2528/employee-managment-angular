import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DepartmentState } from '../state/department.state';

export const selectDepartmentState =
  createFeatureSelector<DepartmentState>('department');

export const selectDepartments = createSelector(
  selectDepartmentState,
  (state) => state.departments
);

export const selectDepartmentLoading = createSelector(
  selectDepartmentState,
  (state) => state.loading
);

export const selectDepartmentError = createSelector(
  selectDepartmentState,
  (state) => state.error
);