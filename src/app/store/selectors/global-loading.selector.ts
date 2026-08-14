import { createSelector } from "@ngrx/store";
import { selectEmployeeLoading } from "./employeeSelector";
import { selectDesignationLoading } from "./designation.selector";
import { selectDepartmentLoading } from "./department.selectors";
import { selectDashboardLogin } from "./dashboard.selector";

export const selectGlobalLoading = createSelector( 
    selectEmployeeLoading, selectDesignationLoading, selectDepartmentLoading, selectDashboardLogin,

    (selectEmployeeLoading, selectDesignationLoading, selectDepartmentLoading, selectDashboardLogin)=> 
    selectEmployeeLoading || selectDesignationLoading || selectDepartmentLoading || selectDashboardLogin

)