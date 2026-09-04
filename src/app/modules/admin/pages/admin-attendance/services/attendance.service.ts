import { inject, Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { AttendanceServerResponse, data } from "../../../../../core/models/attendance.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../../Enviorment/enviorment";
import { ApiConstants } from "../../../../../core/API_Constants";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AttendanceService extends EntityCollectionServiceBase<data>{

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory){
        super('Attendance', serviceElementsFactory)
    }

    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    checkinUrl = `${this.baseUrl}${ApiConstants.Attendance.CHECK_IN}`
    checkOutUrl = `${this.baseUrl}${ApiConstants.Attendance.CHECK_OUT}`
    userAttendanceUrl = `${this.baseUrl}${ApiConstants.Attendance.ATTENDANCE_USER}`
    AdminuserAttendanceUrl = `${this.baseUrl}attendance`

    checkin(): Observable<data>{
        return this.http.post<data>(this.checkinUrl, {})
    }

    checkout(): Observable<data>{
        return this.http.post<data>(this.checkOutUrl, {})
    }

    userAttendance(): Observable<data[]>{
        return this.http.get<data[]>(this.userAttendanceUrl)
    }

    selectedUserAttendance(month: number, year: number, employeeId: string): Observable<AttendanceServerResponse>{
        return this.http.get<AttendanceServerResponse>(`${this.AdminuserAttendanceUrl}`,{
            params: {month, year, employeeId}
        })
    }

    downloadFile(employeeId: string){
        return this.http.get(`${this.baseUrl}${ApiConstants.Attendance.DOWNLOAD_ATTENDANCE_OF_EMPLOYEE}`,{
            params:{employeeId}, responseType: 'blob'
        })
    }
    

}