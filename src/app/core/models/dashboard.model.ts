import { EmployeeServerResponse } from "./emloyee.model";

export interface DashboardServerResponse {
    presentToday:    number;
    recentEmployees: RecentEmployee[];
    recentLeave:     RecentLeave[];
    OnLeaveToday: OnLeaveTodayDTO[]
}

export interface RecentEmployee {
    id:           string;
    employeeCode: string;
    name:         string;
    dateOfJoin:   Date;
    status:       string;
    department:   string;
    designation:  string;
} 

export interface RecentLeave {
    id:           string;
    employeeName: string;
    startDate:    Date;
    endDate:      Date;
    status:       string;
    reason:       string;
}

export interface OnLeaveTodayDTO {
  id: string;
  employeeId: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  approvedBy: string;
  createdAt: string;
  updatedAt: string;
  employee: EmployeeServerResponse;
}

