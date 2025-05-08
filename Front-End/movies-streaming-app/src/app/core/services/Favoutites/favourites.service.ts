import { Injectable } from '@angular/core';
import { AccountService } from '../Account/account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MediaItem } from '../../dtos/MediaItemDto';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private _accounrtService: AccountService, private _http: HttpClient) { }

  // Add to favorites
  addToFavorites(body: MediaItem): Observable<boolean> {
    const token = this._accounrtService.getToken();
    if (!token) {
      return of(false);
    }

    const headers = new HttpHeaders({
      "accept": "application/json",
    }).set("Authorization", `Bearer ${token}`);

    const url = `${environment.account_base_url}/api/lists/favorites`;
    return this._http.post<any>(url, body, { headers: headers }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  // Delete from favorites
  deleteFromFavorites(body: MediaItem): Observable<boolean> {
    const token = this._accounrtService.getToken();
    if (!token) {
      return of(false);
    }

    const headers = new HttpHeaders({
      "accept": "application/json",
    }).set("Authorization", `Bearer ${token}`);

    const url = `${environment.account_base_url}/api/lists/favorites`;
    const options = {
      headers: headers,
      body: body
    };

    return this._http.delete<any>(url, options).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  getFavorites(): Observable<MediaItem[]> {
    const token = this._accounrtService.getToken();
    if (!token) {
      return throwError(() => new Error('User not authenticated'));
    }
  
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    const url = `${environment.account_base_url}/api/lists/favorites`;
  
    return this._http.get<MediaItem[]>(url, { headers }).pipe(
      catchError(() => throwError(() => new Error('Failed to load favorites')))
    );
  }
}
