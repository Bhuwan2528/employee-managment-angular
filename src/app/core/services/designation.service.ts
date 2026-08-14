import { inject, Injectable } from "@angular/core";
import { environment } from "../../../Enviorment/enviorment";
import { ApiConstants } from "../API_Constants";
import { HttpClient } from "@angular/common/http";
import { DesignationRequest, DesignationServerResponseDTO } from "../models/designation.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DesignationService{
    baseUrl = environment.apiUrl;
    apiURL = `${this.baseUrl}${ApiConstants.DESIGNATION}`

    http = inject(HttpClient)

    getDesignation(): Observable<DesignationServerResponseDTO[]>{
        return this.http.get<DesignationServerResponseDTO[]>(this.apiURL)
    }

    addDesignation(request: DesignationRequest): Observable<DesignationServerResponseDTO>{
        return this.http.post<DesignationServerResponseDTO>(this.apiURL, request)
    }

    updateDesignation(id: string, request: DesignationRequest): Observable<DesignationServerResponseDTO>{
        return this.http.patch<DesignationServerResponseDTO>(`${this.apiURL}/${id}`, request)
    }
    deleteDesignation(id: string): Observable<void>{
        return this.http.delete<void>(`${this.apiURL}/${id}`)
    }
}