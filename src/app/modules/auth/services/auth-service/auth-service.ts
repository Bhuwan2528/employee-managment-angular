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
    private refreshIntervalId: ReturnType<typeof setInterval> | null = null;

    login(request : LoginRequest): Observable<LoginServerResponseDTO> {
        return this.http.post<LoginServerResponseDTO>( `${this.baseURL}${ApiConstants.LOGIN}`, request, { withCredentials: true } );
    }

    // The refresh token now lives only in an httpOnly cookie set by the backend
    // on /auth -- the browser attaches it automatically, so nothing to read/send here.
    refreshToken(): Observable<RefreshTokenResponseDTO>{
        return this.http.post<RefreshTokenResponseDTO>(`${this.baseURL}${ApiConstants.REFRESH_TOKEN}`, {}, { withCredentials: true })
    }

    // Guards against stacking intervals -- called both right after login and,
    // on app bootstrap, for a page reload/new tab resuming an existing session.
    setTokenRefresh(){
        this.stopTokenRefresh();
        this.refreshIntervalId = setInterval(()=>{
            this.refreshToken().subscribe( response => {
                localStorage.setItem('accessToken', response.accessToken);
                console.log("TOKEN REFRESHED", response );
            })
        }, 50000)
    }

    stopTokenRefresh(){
        if(this.refreshIntervalId !== null){
            clearInterval(this.refreshIntervalId);
            this.refreshIntervalId = null;
        }
    }

    logout(){
        return this.http.post(`${this.baseURL}${ApiConstants.LOGOUT}`, {}, { withCredentials: true })
    }
}

