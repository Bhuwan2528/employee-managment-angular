import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../Enviorment/enviorment";
import { Observable } from "rxjs";
import { SalaryRequest, SalaryServerResponse } from "../models/payroll.model";
import { ApiConstants } from "../API_Constants";

@Injectable({
    providedIn: 'root'
})

export class SalaryService{
    http = inject(HttpClient)
    baseUrl = environment.apiUrl;

    getSalaryPerEmployee(id: string): Observable<SalaryServerResponse[]>{
        return this.http.get<SalaryServerResponse[]>(`${this.baseUrl}${ApiConstants.PAYROLL.GET_EMPLOYEE_SALARY_ADMIN}/${id}`)
    }

    getLastpaidPerEmployee(id: string): Observable<SalaryServerResponse>{
        return this.http.get<SalaryServerResponse>(`${this.baseUrl}${ApiConstants.PAYROLL.GET_EMPLOYEE_SALARY_ADMIN}/${id}`)
    }

    getEmployeeSalary(): Observable<SalaryServerResponse[]>{
        return this.http.get<SalaryServerResponse[]>(`${this.baseUrl}${ApiConstants.PAYROLL.GET_EMPLOYEE_SALARY}`)
    }

    getEmployeeLastpaid(): Observable<SalaryServerResponse>{
        return this.http.get<SalaryServerResponse>(`${this.baseUrl}${ApiConstants.PAYROLL.GET_EMPLOYEE_LASTPAID_SELF}`)
    }

    createSalary(request: SalaryRequest, id: string): Observable<SalaryServerResponse>{
        return this.http.post<SalaryServerResponse>(`${this.baseUrl}${ApiConstants.PAYROLL.CREATE_SALARY}/${id}`, request)
    }

    downloadSalary(employeeId: string){
        return this.http.get(`${this.baseUrl}${ApiConstants.PAYROLL.DOWNLOAD_SALARY}`,{
            params: {employeeId}, responseType: 'blob'
        })
    }
}
