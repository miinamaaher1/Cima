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
import { UserService } from '../user/user.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  headers = new HttpHeaders().set("Accept", "application/json");

  constructor(
    private _http: HttpClient,
    private router: Router,
    private _userService : UserService
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
    return this._http.post<LoginResponseDto>(url, userData, { headers: this.headers }).pipe(
      tap((response) => {
        localStorage.setItem('userToken', response.token);
        this.getUserSummary().subscribe(); // Fetch and update user state
      }))
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

  logout(): void {
    localStorage.removeItem('userToken');
    this._userService.clearUser();
    this.router.navigate(['/sign-in']);
  }


  // check if the user is logged in
  isLoggedIn(): boolean {
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
    const emptyUser: IUserSummary = {
      isLoggedIn: false,
      userType: null,
      userInfo: null,
      subscription: null,
    };
    this._userService.setUser(emptyUser); // Update state for logged-out users
    return of(emptyUser);
  }

  return this.getUserType().pipe(
    switchMap((userType) => {
      if (userType.role === 'admin') {
        return this.getUserInfo().pipe(
          map((userInfo) => {
            const adminUser: IUserSummary = {
              isLoggedIn: true,
              userType,
              userInfo,
              subscription: null,
            };
            this._userService.setUser(adminUser); // Update state for admin
            return adminUser;
          })
        );
      }

      // For regular users
      return forkJoin({
        userInfo: this.getUserInfo(),
        subscription: this.getSubscriptionData(),
      }).pipe(
        map(({ userInfo, subscription }) => {
          const regularUser: IUserSummary = {
            isLoggedIn: true,
            userType,
            userInfo,
            subscription,
          };
          this._userService.setUser(regularUser); // Update state for regular user
          return regularUser;
        })
      );
    }),
    catchError((error) => {
      console.error('Error fetching user summary:', error);
      const errorState: IUserSummary = {
        isLoggedIn: true, // Assume still logged in (token exists)
        userType: null,
        userInfo: null,
        subscription: null,
      };
      this._userService.setUser(errorState); // Update state on error
      return of(errorState);
    })
  );
}

}
