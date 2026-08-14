import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../Enviorment/enviorment';
import { Observable } from 'rxjs';
import { LoginRequest, LoginServerResponseDTO } from '../../model/auth.model';
import { ApiConstants } from '../../../../core/API_Constants';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    private readonly http = inject(HttpClient);
    private readonly baseURL = environment.apiUrl;

    login(request : LoginRequest): Observable<LoginServerResponseDTO> {

        return this.http.post<LoginServerResponseDTO>( `${this.baseURL}${ApiConstants.LOGIN}`, request  );
    }

}
