import { createReducer, on } from '@ngrx/store';

import * as DepartmentActions from '../actions/deapartment.actions';
import {
  DepartmentState,
  initialDepartmentState
} from '../state/department.state';

export const departmentReducer = createReducer(

  initialDepartmentState,

  on(DepartmentActions.loadDepartments, (state): DepartmentState => ({
    ...state,
    loading: true,
    error: null
  })),

  on(DepartmentActions.loadDepartmentsSuccess, (state, { departments }): DepartmentState => ({
    ...state,
    departments,
    loading: false
  })),

  on(DepartmentActions.loadDepartmentsFailure, (state, { error }): DepartmentState => ({
    ...state,
    loading: false,
    error
  })),

  //====================  Add Department  ==========================

  on(DepartmentActions.addDepartment, (state) => ({
  ...state,
  loading: true,
  error: null
})),

on(DepartmentActions.addDepartmentSuccess, (state, { department }) => ({
  ...state,
  loading: false,
  departments: [...state.departments, department]
})),

on(DepartmentActions.addDepartmentFailure, (state, { error }) => ({
  ...state,
  loading: false,
  error
})),

on(DepartmentActions.updateDepartmentSuccess, (state, { department }) => ({
  ...state,
  loading: false,
  departments: state.departments.map((d) =>
    d.id === department.id ? department : d
  )
})),

on(DepartmentActions.deleteDepartmentSuccess, (state, { id }) => ({
  ...state,
  loading: false,
  departments: state.departments.filter(d => d.id !== id)
}))

);