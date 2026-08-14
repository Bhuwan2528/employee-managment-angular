import { createSelector } from "@ngrx/store";
import { selectEmployeeLoading } from "./employeeSelector";
import { selectDesignationLoading } from "./designation.selector";
import { selectDepartmentLoading } from "./department.selectors";
import { selectDashboardLogin } from "./dashboard.selector";
import { selectAttendanceLoading } from "./attendance.selector";
import { selectAuthLoading } from "./auth.selectors";
import { selectLeaveLoading } from "./leave.selector";
import { selectSalaryLoading } from "./salary.selector";

export const selectGlobalLoading = createSelector( 
    selectEmployeeLoading, selectDesignationLoading, selectDepartmentLoading, selectDashboardLogin, selectAttendanceLoading, selectAuthLoading, selectLeaveLoading, selectSalaryLoading ,

    (selectEmployeeLoading, selectDesignationLoading, selectDepartmentLoading, selectDashboardLogin, selectAttendanceLoading, selectAuthLoading, selectLeaveLoading, selectSalaryLoading)=> 
    selectEmployeeLoading || selectDesignationLoading || selectDepartmentLoading || selectDashboardLogin || selectAttendanceLoading || selectAuthLoading || selectLeaveLoading || selectSalaryLoading

)