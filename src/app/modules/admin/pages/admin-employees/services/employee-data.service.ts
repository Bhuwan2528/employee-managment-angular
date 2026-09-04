import { inject, Injectable } from "@angular/core";
import { DefaultDataService, HttpOptions, HttpUrlGenerator, QueryParams } from "@ngrx/data";
import { EmployeeListResponse, EmployeeRequest, employeeRoleRequest, EmployeeServerResponse, EmployeeUpdateRequest } from "../../../../../core/models/emloyee.model";
import { HttpClient } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";
import { environment } from "../../../../../../Enviorment/enviorment";
import { ApiConstants } from "../../../../../core/API_Constants";
import { Update } from "@ngrx/entity";
import { Store } from "@ngrx/store";
import { setEmployeePagination } from "../../../../../store/actions/employee.action";
import { StoreService } from "../../../../../core/services/storeService";

@Injectable({
    providedIn: 'root'
})

export class EmployeeDataService extends DefaultDataService<EmployeeServerResponse>{

    baseUrl = environment.apiUrl
    EmployeeApi = `${this.baseUrl}${ApiConstants.EMPLOYEE}`
    storeService = inject(StoreService)

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator){
        super('Employee', http, httpUrlGenerator)
    }

    override getWithQuery(queryParams: QueryParams | string | undefined | number, options?: HttpOptions): Observable<EmployeeServerResponse[]> {
        return this.http.get<EmployeeListResponse>(this.EmployeeApi, {params: queryParams as any}).pipe(
            tap((res)=> {
                this.storeService.addEmployeePagination(res.pagination)
            }),
            map(res=> res.data)
        )
    }

    override update(update: Update<EmployeeServerResponse>, options?: HttpOptions): Observable<EmployeeServerResponse> {

        const request: EmployeeUpdateRequest = {
            firstName: update.changes.firstName!,
            lastName: update.changes.lastName!,
            phone: update.changes.phone!,
            dateOfJoining: update.changes.dateOfJoining!.toISOString(),
            departmentId:  update.changes.departmentId!,
            designationId: update.changes.designationId!,
            status: update.changes.status!,
            basic:  update.changes.basic!
        }

        return this.http.patch<EmployeeServerResponse>(`${this.EmployeeApi}${update.id}`, request)
    }

}