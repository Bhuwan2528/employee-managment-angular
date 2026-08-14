import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../Enviorment/enviorment";
import { ApiConstants } from "../API_Constants";
import { EmployeeRequest, EmployeeServerResponse, EmployeeUpdateRequest } from "../models/emloyee.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class EmployeeServices{
    private http = inject(HttpClient);

    baseUrl = environment.apiUrl;
    apiURL = `${this.baseUrl}${ApiConstants.EMPLOYEE}`;

    getEmployees(): Observable<EmployeeServerResponse[]>{
        return this.http.get<EmployeeServerResponse[]>(this.apiURL)
    }

    addEmployee(request: EmployeeRequest): Observable<EmployeeServerResponse>{
        return this.http.post<EmployeeServerResponse>(`${this.baseUrl}${ApiConstants.EMPLOYEE_CREATE}`, request)
    }

    updateEmployee(request: EmployeeUpdateRequest, id: string | undefined): Observable<EmployeeServerResponse>{
        return this.http.patch<EmployeeServerResponse>(`${this.apiURL}/${id}`, request)
    }

    deleteEmployee(id:string){
        return this.http.delete<void>(`${this.apiURL}/${id}`)
    }
}