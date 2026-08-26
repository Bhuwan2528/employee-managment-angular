import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../Enviorment/enviorment';
import { Observable } from 'rxjs';
import { LoginRequest, LoginServerResponseDTO, RefreshTokenResponseDTO } from '../../model/auth.model';
import { ApiConstants } from '../../../../core/API_Constants';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    private readonly http = inject(HttpClient);
    private readonly baseURL = environment.apiUrl;

    login(request : LoginRequest): Observable<LoginServerResponseDTO> {
        return this.http.post<LoginServerResponseDTO>( `${this.baseURL}${ApiConstants.LOGIN}`, request );
    }

    refreshToken(): Observable<RefreshTokenResponseDTO>{
        const refreshToken = localStorage.getItem('refreshToken');
        return this.http.post<RefreshTokenResponseDTO>(`${this.baseURL}${ApiConstants.REFRESH_TOKEN}`, { refreshToken })
    }

    setTokenRefresh(){
        setInterval(()=>{
            this.refreshToken().subscribe( response => {
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);
                console.log("TOKEN REFRESHED", response );
            })
        }, 10000)
    }

    logout(){
        const refreshToken = localStorage.getItem('refreshToken');
        return this.http.post(`${this.baseURL}${ApiConstants.LOGOUT}`, { refreshToken })
    }
}

