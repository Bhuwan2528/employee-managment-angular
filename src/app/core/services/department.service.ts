import { inject, Injectable } from "@angular/core";
import { environment } from "../../../Enviorment/enviorment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DepartmentRequestDto, DepartmentServerResponseDto } from "../models/department.model";
import { ApiConstants } from "../API_Constants";

@Injectable({
    providedIn: 'root'
})

export class DepartmentService{
    baseUrl = environment.apiUrl
    apiUrl = `${this.baseUrl}${ApiConstants.DEPARTMENT}`
    private http = inject(HttpClient)

    getDepartments(): Observable<DepartmentServerResponseDto[]> {
        return this.http.get<DepartmentServerResponseDto[]>(this.apiUrl);
    }

    addDepartment(request: DepartmentRequestDto): Observable<DepartmentServerResponseDto>{
        return this.http.post<DepartmentServerResponseDto>(this.apiUrl, request)
    }

    updateDepartment( id: string, request: DepartmentRequestDto ): Observable<DepartmentServerResponseDto> {
        return this.http.patch<DepartmentServerResponseDto>( `${this.apiUrl}/${id}`, request );
   }

    deleteDepartment(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}