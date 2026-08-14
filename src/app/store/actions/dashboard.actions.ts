import { createAction, props } from "@ngrx/store";
import { DashboardServerResponse } from "../../core/models/dashboard.model";

export const loadDashboard = createAction(
    '[dashboard] dashboard loaded'
)

export const loadDashboardSuccesful = createAction(
    '[dashboard] dashboard oaded succesfully',
    props<{dashboard: DashboardServerResponse}>()
)

export const loadDashboardFaliure = createAction(
    '[dashboard] dashboard loaded failed',
    props<{error: string}>()
)