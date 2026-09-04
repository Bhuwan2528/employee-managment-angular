import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { DefaultDataService, HttpOptions, HttpUrlGenerator, QueryParams } from "@ngrx/data";
import { AttendanceServerResponse, data } from "../../../../../core/models/attendance.model";
import { map, Observable } from "rxjs";
import { environment } from "../../../../../../Enviorment/enviorment";
import { ApiConstants } from "../../../../../core/API_Constants";
import { StoreService } from "../../../../../core/services/storeService";

@Injectable({
    providedIn: 'root'
})

export class AttendanceDataService extends DefaultDataService<data>{

    baseUrl = environment.apiUrl
    AttendanceApi = `${this.baseUrl}${ApiConstants.Attendance.ATTENDANCE_USER_ADMIN}` 
    storeService = inject(StoreService)

    constructor(http: HttpClient, httpGenerator: HttpUrlGenerator){
        super('Attendance', http, httpGenerator)
    }
}