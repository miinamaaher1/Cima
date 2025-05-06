import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VideoType } from '../../dtos/VideoType';
import { environment } from '../../environments/environment';
import { MediaItem } from '../../dtos/MediaItemDto';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  constructor(private http: HttpClient) {}

  // Add to watchlist
  addToWatchlist(body: MediaItem): Observable<any> {
    if (!localStorage.getItem('token')) {
      console.error('User is not authenticated. Cannot add to watchlist.');
      return throwError('User not authenticated');
    }

    const url = `${environment.account_base_url}/watchlist`;
    return this.http.post(url, body).pipe(
      catchError(error => {
        console.error('Error adding to watchlist:', error);
        return throwError(error);
      })
    );
  }

  // Delete from watchlist
  deleteFromWatchlist(body: MediaItem): Observable<any> {
    if (!localStorage.getItem('token')) {
      console.error('User is not authenticated. Cannot delete from watchlist.');
      return throwError('User not authenticated');
    }

    const url = `${environment.account_base_url}/watchlist`;
    return this.http.delete(url, { body }).pipe(
      catchError(error => {
        console.error('Error deleting from watchlist:', error);
        return throwError(error);
      })
    );
  }

  // Get watchlist
  getWatchlist(): Observable<any> {
    if (!localStorage.getItem('token')) {
      console.error('User is not authenticated. Cannot get watchlist.');
      return throwError('User not authenticated');
    }

    const url = `${environment.account_base_url}/watchlist`;
    return this.http.get(url).pipe(
      catchError(error => {
        console.error('Error getting watchlist:', error);
        return throwError(error);
      })
    );
  }
}
