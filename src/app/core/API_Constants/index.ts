export const ApiConstants = {

LOGIN: 'auth/login',
DESIGNATION: 'designations',
DEPARTMENT: 'departments',
EMPLOYEE: 'employees',
EMPLOYEE_CREATE: 'users/employees',
LEAVES: 'leave',
CREATE_LEAVE: 'leave/user',
USER_LEAVE: 'leave/user',
DASHBOARD: 'dashboard',

Attendance: {
CHECK_IN: 'attendance/user/checkin',
CHECK_OUT: 'attendance/user/checkout',
ATTENDANCE_USER: 'attendance/user',
ATTENDANCE_USER_ADMIN: 'attendance/employee',
},

PAYROLL:{
CREATE_SALARY: 'salary',    //id
GET_EMPLOYEE_SALARY_ADMIN: 'salary', //id
GET_LASTPAID_ADMIN: 'salary/lastpaid',  //id
GET_EMPLOYEE_SALARY: 'salary/user',
GET_EMPLOYEE_LASTPAID_SELF: 'salary/user/lastpaid'
}

}