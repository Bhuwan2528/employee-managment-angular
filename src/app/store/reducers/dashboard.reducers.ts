import { createReducer, on } from '@ngrx/store'
import * as DashboardActions from '../actions/dashboard.actions'
import { initailDashboardState } from '../state/dashboard.state'

export const DashboardReducer = createReducer(

    initailDashboardState,

    on(DashboardActions.loadDashboard, (state)=>({
        ...state,
        loading: true
    })),

    on(DashboardActions.loadDashboardSuccesful, (state, {dashboard})=>({
        ...state,
        loading: false,
        error: null,
        dashboard
    })),

    on(DashboardActions.loadDashboardFaliure, (state, {error})=>({
        ...state, 
        loading: false,
        error
    }))
)