import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState } from "../state/dashboard.state";

export const DashboardSelectorState = createFeatureSelector<DashboardState>('dashboard')

export const selectDashboard = createSelector(DashboardSelectorState, (state)=> state.dashboard)

export const selectDashboardLogin = createSelector(DashboardSelectorState, (state)=> state.loading)

export const selectDashboardError = createSelector(DashboardSelectorState, (state)=> state.error)