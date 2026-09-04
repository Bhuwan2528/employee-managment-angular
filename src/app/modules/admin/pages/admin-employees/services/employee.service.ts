import { inject, Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { EmployeeRequest, employeeRoleRequest, EmployeeServerResponse } from "../../../../../core/models/emloyee.model";
import { environment } from "../../../../../../Enviorment/enviorment";
import { ApiConstants } from "../../../../../core/API_Constants";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class EmployeeOperationService extends EntityCollectionServiceBase<EmployeeServerResponse>{

    constructor(serviceElementFactory: EntityCollectionServiceElementsFactory){
        super('Employee', serviceElementFactory)
    }

    baseUrl = environment.apiUrl
    EmployeeApi = `${this.baseUrl}${ApiConstants.EMPLOYEE}`
    http = inject(HttpClient)
    

    addEmployee(request: EmployeeRequest): Observable<EmployeeServerResponse> {
        return this.http.post<EmployeeServerResponse>(this.EmployeeApi , request)
    }

    empoyeeRole(request: employeeRoleRequest){
        return this.http.patch<EmployeeServerResponse>(`${this.baseUrl}${ApiConstants.ASSIGN_ROLES}`, request,)
    }

    bulkUserCreate(request: EmployeeRequest[]){
        return this.http.post<EmployeeServerResponse[]>(`${this.baseUrl}${ApiConstants.BULK_USER_CREATE}`, {employees: request})
    }
}