import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../Enviorment/enviorment";
import { ApiConstants } from "../API_Constants";
import { LeaveRequest, LeaveServerResponse } from "../models/leaves.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LeaveService{
    private http = inject(HttpClient)
    baseURL = environment.apiUrl
    apiURL = `${this.baseURL}${ApiConstants.LEAVES}`

    getAllLeaves(): Observable<LeaveServerResponse[]>{
        return this.http.get<LeaveServerResponse[]>(this.apiURL)
    }

    ApproveLeave(id: string): Observable<LeaveServerResponse>{
        return this.http.patch<LeaveServerResponse>(`${this.apiURL}/${id}/approve`, {})
    }

    RejectLeave(id: string):Observable<LeaveServerResponse>{
        return this.http.patch<LeaveServerResponse>(`${this.apiURL}/${id}/reject`, {})
    }

    createLeave(request: LeaveRequest): Observable<LeaveServerResponse>{
        return this.http.post<LeaveServerResponse>(`${this.baseURL}${ApiConstants.CREATE_LEAVE}`, request)
    }

    getuserLeaves():Observable<LeaveServerResponse[]>{
        return this.http.get<LeaveServerResponse[]>(`${this.baseURL}${ApiConstants.USER_LEAVE}`)
    }


}