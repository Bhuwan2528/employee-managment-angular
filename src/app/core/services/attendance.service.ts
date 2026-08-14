import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AttendanceServerResponse } from "../models/attendance.model";
import { environment } from "../../../Enviorment/enviorment";
import { ApiConstants } from "../API_Constants";
import { Store } from "@ngrx/store";

@Injectable({
    providedIn: 'root'
})

export class AttendanceService{
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    checkinUrl = `${this.baseUrl}${ApiConstants.Attendance.CHECK_IN}`
    checkOutUrl = `${this.baseUrl}${ApiConstants.Attendance.CHECK_OUT}`
    userAttendanceUrl = `${this.baseUrl}${ApiConstants.Attendance.ATTENDANCE_USER}`
    AdminuserAttendanceUrl = `${this.baseUrl}${ApiConstants.Attendance.ATTENDANCE_USER_ADMIN}`

    checkin(): Observable<AttendanceServerResponse>{
        return this.http.post<AttendanceServerResponse>(this.checkinUrl, {})
    }

    checkout(): Observable<AttendanceServerResponse>{
        return this.http.post<AttendanceServerResponse>(this.checkOutUrl, {})
    }

    userAttendance(): Observable<AttendanceServerResponse[]>{
        return this.http.get<AttendanceServerResponse[]>(this.userAttendanceUrl)
    }

    selectedUserAttendance(id: string): Observable<AttendanceServerResponse[]>{
        return this.http.get<AttendanceServerResponse[]>(`${this.AdminuserAttendanceUrl}/${id}`)
    }

}