import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DesignationState } from "../state/designation.state";
import { selectDepartmentState } from "./department.selectors";

export const selectDesignationState = createFeatureSelector<DesignationState>('designation')

export const selectDesignation = createSelector( selectDesignationState, (state)=> state.designations)

export const selectDesignationLoading = createSelector(selectDesignationState, (state)=> state.loading )

export const selectDesignationError = createSelector(selectDesignationState, (state)=> state.error)