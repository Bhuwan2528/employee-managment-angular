import { createAction, props } from '@ngrx/store';
import { EmployeePagination } from '../../core/models/emloyee.model';

export const setEmployeePagination = createAction(
  '[Employee Pagination] Set Pagination',
  props<{
    pagination: EmployeePagination;
  }>()
);