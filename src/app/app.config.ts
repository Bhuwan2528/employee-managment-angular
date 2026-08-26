import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthService } from './modules/auth/services/auth-service/auth-service';


import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducers';
import { departmentReducer } from './store/reducers/department.reducers';
import { provideEffects } from '@ngrx/effects';
import { DepartmentEffects } from './store/effects/department.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { DesignationReducer } from './store/reducers/designation.reducers';
import { DesignationEffects } from './store/effects/designation.effects';
import { EmployeeEffects } from './store/effects/employee.effects';
import { EmployeeReducer } from './store/reducers/employeeReducers';
import { leaveReducer } from './store/reducers/leaveReducers';
import { LeavesEffects } from './store/effects/leave.effects';
import { AuthEffects } from './store/effects/auth.effects';
import { DashboardReducer } from './store/reducers/dashboard.reducers';
import { DashboardEffects } from './store/effects/dashboard.effects';
import { AttendanceReducer } from './store/reducers/attendance.reducers';
import { AttendanceEffects } from './store/effects/attendance.effects';
import { salaryReducer } from './store/reducers/salary.reducers';
import { SalaryEffects } from './store/effects/salary.effects';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),

    provideStore({
      auth: authReducer,
      department: departmentReducer,
      designation: DesignationReducer,
      employee: EmployeeReducer,
      leave: leaveReducer,
      dashboard: DashboardReducer,
      attendance: AttendanceReducer,
      salary: salaryReducer
    }),

    provideEffects(DepartmentEffects, DesignationEffects, EmployeeEffects, LeavesEffects, AuthEffects, DashboardEffects, AttendanceEffects, SalaryEffects),

    // A page reload/new tab re-bootstraps the app, which loses the in-memory
    // setInterval that keeps the access token refreshed -- without this, a
    // resumed session silently stops refreshing and 401s ~15 minutes later.
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      if (localStorage.getItem('accessToken') && localStorage.getItem('user')) {
        authService.setTokenRefresh();
      }
    })
  ]
};

