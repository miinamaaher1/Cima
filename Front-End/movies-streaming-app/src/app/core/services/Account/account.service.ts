import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SignUpDto } from '../../dtos/SignUpDto';
import { SignInDto } from '../../dtos/SignInDto';
import { LoginResponseDto } from '../../dtos/LoginResponseDto';
import { Router } from '@angular/router';
import { ISubscription } from '../../interfaces/ISubscriptionData';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { IUserType } from '../../interfaces/IUser';

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

  confirmEmail(email: string, token: string): Observable<boolean> {
    const endpoint = "api/Account/confirm-email";
    const url = `${environment.account_base_url}/${endpoint}?email=${email}&token=${token}`;
    return this._http.get<any>(url).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  // login service 
  login(userData: SignInDto) {
    const endpoint = "api/Account/login";
    const url = `${environment.account_base_url}/${endpoint}`;
    return this._http.post<LoginResponseDto>(url, userData, { headers: this.headers });
  }

  // get user data service
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


  // get the user subscription data
  getSubscriptionData(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const endpoint = "api/Account/subscription";
    const url = `${environment.account_base_url}/${endpoint}`;
    return this._http.get<ISubscription>(url, { headers: this.headers });
  }

  // Get the user type (role)
  getUserType(): Observable<IUserType> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('User not authenticated'));
    }
    const endpoint = "/api/User/type";
    const url = `${environment.account_base_url}${endpoint}`;
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this._http.get<IUserType>(url, { headers });
  }
}