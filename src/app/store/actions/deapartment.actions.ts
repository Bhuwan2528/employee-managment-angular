import { createAction, props } from '@ngrx/store';
import { DepartmentRequestDto, DepartmentServerResponseDto } from '../../core/models/department.model';


/* ================= Load ================= */

export const loadDepartments = createAction(
  '[Department] Load Departments'
);

export const loadDepartmentsSuccess = createAction(
  '[Department] Load Departments Success',
  props<{ departments: DepartmentServerResponseDto[] }>()
);

export const loadDepartmentsFailure = createAction(
  '[Department] Load Departments Failure',
  props<{ error: string }>()
);

/* ================= Add ================= */

export const addDepartment = createAction(
  '[Department] Add Department',
  props<{ request: DepartmentRequestDto }>()
);

export const addDepartmentSuccess = createAction(
  '[Department] Add Department Success',
  props<{ department: DepartmentServerResponseDto }>()
);

export const addDepartmentFailure = createAction(
  '[Department] Add Department Failure',
  props<{ error: string }>()
);

/* ================= Update ================= */

export const updateDepartment = createAction(
  '[Department] Update Department',
  props<{
    id: string;
    request: DepartmentRequestDto;
  }>()
);

export const updateDepartmentSuccess = createAction(
  '[Department] Update Department Success',
  props<{ department: DepartmentServerResponseDto }>()
);

export const updateDepartmentFailure = createAction(
  '[Department] Update Department Failure',
  props<{ error: string }>()
);

/* ================= Delete ================= */

export const deleteDepartment = createAction(
  '[Department] Delete Department',
  props<{ id: string }>()
);

export const deleteDepartmentSuccess = createAction(
  '[Department] Delete Department Success',
  props<{ id: string }>()
);

export const deleteDepartmentFailure = createAction(
  '[Department] Delete Department Failure',
  props<{ error: string }>()
);