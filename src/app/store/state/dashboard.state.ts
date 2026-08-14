import { DashboardServerResponse } from "../../core/models/dashboard.model";

export interface DashboardState{
    dashboard: DashboardServerResponse | null;
    loading: boolean;
    error: string | null;
}

export const initailDashboardState: DashboardState = {
    dashboard: null,
    loading: false,
    error: null
}