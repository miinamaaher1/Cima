import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SignUpDto } from '../../dtos/SignUpDto';
import { SignInDto } from '../../dtos/SignInDto';
import { LoginResponseDto } from '../../dtos/LoginResponseDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  headers = new HttpHeaders()
    .set("Accept", "application/json");
  constructor(private _http: HttpClient) { }

  // register service 
  register(userData: SignUpDto) {
    const endpoint = "api/Account/register";
    const url = `${environment.account_base_url}/${endpoint}`;
    return this._http.post<any>(url, userData, { headers: this.headers });
  }

  // login service 
  login(userData : SignInDto){
    const endpoint = "api/Account/login";
    const url = `${environment.account_base_url}/${endpoint}`;
    return this._http.post<LoginResponseDto>(url, userData, { headers: this.headers });
  }

  
}
