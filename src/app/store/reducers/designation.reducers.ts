import { createReducer, on } from "@ngrx/store";
import * as DesignationAction from '../actions/designation.actions';
import {
  DesignationState,
  initialDesignationState
} from "../state/designation.state";

export const DesignationReducer = createReducer(

  initialDesignationState,

  // ==================== Load ====================

  on(DesignationAction.loadDesignation, (state): DesignationState => ({
    ...state,
    loading: true,
    error: null
  })),

  on(DesignationAction.loadDesignationSuccesful, (state, { designations }): DesignationState => ({
    ...state,
    designations,
    loading: false,
    error: null
  })),

  on(DesignationAction.loadDesignationFaliure, (state, { error }): DesignationState => ({
    ...state,
    loading: false,
    error
  })),

  // ==================== Add ====================

  on(DesignationAction.addDesignation, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(DesignationAction.addDesignationSuccesful, (state, { designation }) => ({
    ...state,
    loading: false,
    error: null,
    designations: [...state.designations, designation]
  })),

  on(DesignationAction.addDesignationFaliure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ==================== Update ====================

  on(DesignationAction.updateDesignation, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(DesignationAction.updateDesignationSuccesful, (state, { designation }) => ({
    ...state,
    loading: false,
    error: null,
    designations: state.designations.map((d) =>
      d.id === designation.id ? designation : d
    )
  })),

  on(DesignationAction.updateDesignationFaliure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ==================== Delete ====================

  on(DesignationAction.deleteDesignation, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(DesignationAction.deleteDesignationSuccesful, (state, { id }) => ({
    ...state,
    loading: false,
    error: null,
    designations: state.designations.filter((d) => d.id !== id)
  })),

  on(DesignationAction.deleteDesignationFaliure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);