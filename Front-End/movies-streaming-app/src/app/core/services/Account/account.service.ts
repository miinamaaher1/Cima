import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SignUpDto } from '../../dtos/SignUpDto';
import { SignInDto } from '../../dtos/SignInDto';
import { LoginResponseDto } from '../../dtos/LoginResponseDto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  headers = new HttpHeaders().set("Accept", "application/json");

  constructor(
    private _http: HttpClient,
    private router: Router
  ) { }

  // register service 
  register(userData: SignUpDto) {
    const endpoint = "api/Account/register";
    const url = `${environment.account_base_url}/${endpoint}`;
    return this._http.post<any>(url, userData, { headers: this.headers });
  }

  // login service 
  login(userData: SignInDto) {
    const endpoint = "api/Account/login";
    const url = `${environment.account_base_url}/${endpoint}`;
    return this._http.post<LoginResponseDto>(url, userData, { headers: this.headers });
  }

  getToken(): string | null {
    const token = localStorage.getItem('userToken');
    if (!token) {
      this.router.navigate(['/sign-in']);
      return null;
    }
    return token;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/sign-in']);
  }
}

