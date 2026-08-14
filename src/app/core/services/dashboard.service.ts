import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../Enviorment/enviorment";
import { ApiConstants } from "../API_Constants";
import { Observable } from "rxjs";
import { DashboardServerResponse } from "../models/dashboard.model";

@Injectable({
    providedIn: 'root'
})

export class DashboardService{

    http = inject(HttpClient)
    baseUrl = environment.apiUrl
    apiURL = `${this.baseUrl}${ApiConstants.DASHBOARD}`

    getDashboard(): Observable<DashboardServerResponse>{
        return this.http.get<DashboardServerResponse>(this.apiURL)
    }
}