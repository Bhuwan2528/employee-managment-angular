export const ApiConstants = {


AUTH:{
    LOGIN: 'auth/login',
    REFRESH_TOKEN: 'auth/refresh',
    LOGOUT: 'auth/logout',
    SIGNUP: 'auth/register',
    RESET_PASSWORD: 'users/change-password',
},

DESIGNATION: 'designations',
DEPARTMENT: 'departments',
EMPLOYEE: 'employees',
EMPLOYEE_CREATE: 'users/employees',
BULK_USER_CREATE: 'users/create-many',
LEAVES: 'leave',
CREATE_LEAVE: 'leave/user',
USER_LEAVE: 'leave/user',
DASHBOARD: 'dashboard',
ASSIGN_ROLES: 'users/assignrole',

Attendance: {
    CHECK_IN: 'attendance/user/checkin',
    CHECK_OUT: 'attendance/user/checkout',
    ATTENDANCE_USER: 'attendance/user',
    ATTENDANCE_USER_ADMIN: 'attendance/employee', // ?month=8&year=2026&employeeId=
    DOWNLOAD_ATTENDANCE_OF_EMPLOYEE: 'attendance/reports' //?employeeId=kljhslxukgq3yrt2i6473o82uficq
},

PAYROLL:{
    CREATE_SALARY: 'salary',    //id
    GET_EMPLOYEE_SALARY_ADMIN: 'salary', //id
    GET_LASTPAID_ADMIN: 'salary/lastpaid',  //id
    GET_EMPLOYEE_SALARY: 'salary/user',
    GET_EMPLOYEE_LASTPAID_SELF: 'salary/user/lastpaid',
    DOWNLOAD_SALARY: 'salary/reports' //?employeeId=kljhslxukgq3yrt2i6473o82uficq
},

PROFILE_UPDATE: 'employee/profile'
}




