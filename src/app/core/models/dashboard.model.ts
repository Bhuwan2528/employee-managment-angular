export interface DashboardServerResponse {
    presentToday:    number;
    recentEmployees: RecentEmployee[];
    recentLeave:     RecentLeave[];
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