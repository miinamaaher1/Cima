import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SignUpDto } from '../../dtos/SignUpDto';
import { SignInDto } from '../../dtos/SignInDto';
import { LoginResponseDto } from '../../dtos/LoginResponseDto';
import { Router } from '@angular/router';
import { ISubscription } from '../../interfaces/ISubscriptionData';
import { catchError, map, Observable, of, throwError, switchMap, forkJoin } from 'rxjs';
import { IUser, IUserType, IUserSummary } from '../../interfaces/IUser';

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

  private isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  }

  // get user data service
  getToken(): string | null {
    if (!this.isLocalStorageAvailable()) {
      this.router.navigate(['/sign-in']);
      return null;
    }
    const token = localStorage.getItem('userToken');
    if (!token) {
      this.router.navigate(['/sign-in']);
      return null;
    }
    return token;
  }

  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('userToken');
    }
    this.router.navigate(['/sign-in']);
  }

  // check if the user is logged in
  isLoggedIn(): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    return !!localStorage.getItem('userToken');
  }

  // get the user subscription data
  getSubscriptionData(): Observable<ISubscription> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('User not authenticated'));
    }
    const endpoint = "api/user/subscription";
    const url = `${environment.account_base_url}/${endpoint}`;
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this._http.get<ISubscription>(url, { headers });
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

  // get user info
  getUserInfo(): Observable<IUser> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('User not authenticated'));
    }
    const endpoint = "/api/user";
    const url = `${environment.account_base_url}${endpoint}`;
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this._http.get<IUser>(url, { headers });
  }

  // Get comprehensive user summary
  getUserSummary(): Observable<IUserSummary> {
    const isLoggedIn = this.isLoggedIn();

    if (!isLoggedIn) {
      return of({
        isLoggedIn: false,
        userType: null,
        userInfo: null,
        subscription: null
      });
    }

    return this.getUserType().pipe(
      switchMap(userType => {
        if (userType.role === 'admin') {
          return this.getUserInfo().pipe(
            map(userInfo => ({
              isLoggedIn: true,
              userType,
              userInfo,
              subscription: null
            }))
          );
        }

        // For regular users, get all data
        return forkJoin({
          userInfo: this.getUserInfo(),
          subscription: this.getSubscriptionData() as Observable<ISubscription>
        }).pipe(
          map(({ userInfo, subscription }) => ({
            isLoggedIn: true,
            userType,
            userInfo,
            subscription
          }))
        );
      }),
      catchError(error => {
        console.error('Error fetching user summary:', error);
        return of({
          isLoggedIn: true,
          userType: null,
          userInfo: null,
          subscription: null
        });
      })
    );
  }
}