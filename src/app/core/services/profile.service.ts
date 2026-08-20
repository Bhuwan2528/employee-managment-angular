import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../Enviorment/enviorment";
import { ApiConstants } from "../API_Constants";
import { Observable } from "rxjs";
import { ProfileRequest, ProfileServerResponse } from "../models/profile.model";
import { EmployeeServerResponse } from "../models/emloyee.model";

@Injectable({
    providedIn: 'root'
})

export class ProfileService{
    http = inject(HttpClient)
    baseUrl = environment.apiUrl
    updateProfileURL = `${this.baseUrl}${ApiConstants.PROFILE_UPDATE}`

    updateProfile(request: ProfileRequest):Observable<ProfileServerResponse>{
        return this.http.patch<ProfileServerResponse>(this.updateProfileURL, request)
    }
}