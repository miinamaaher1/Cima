import { Injectable } from '@angular/core';
import { AccountService } from '../Account/account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MediaItem } from '../../dtos/MediaItemDto';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private _accounrtService: AccountService, private _http: HttpClient) { }

  // Add to favorites
  addToFavorites(body: MediaItem) {
    const token = this._accounrtService.getToken();
    if (!token) {
      console.error('User is not authenticated. Cannot add to favorites.');
      return;
    }

    const headers = new HttpHeaders({
      "accept": "application/json",
    }).set("Authorization", `Bearer ${token}`);

    const url = `${environment.account_base_url}/api/lists/favorites`;
    this._http.post<any>(url, body, { headers: headers });
  }

  // Delete from favorites
  deleteFromFavorites(body: MediaItem) {
    const token = this._accounrtService.getToken();
    if (!token) {
      console.error('User is not authenticated. Cannot delete from favorites.');
      return;
    }

    const headers = new HttpHeaders({
      "accept": "application/json",
    }).set("Authorization", `Bearer ${token}`);

    const url = `${environment.account_base_url}/api/lists/favorites`;
    const options = {
      headers: headers,
      body: body
    };

    this._http.delete<any>(url, options);
  }

  // Get favorites
  getFavorites() {
    const token = this._accounrtService.getToken();
    if (!token) {
      console.error('User is not authenticated. Cannot get favorites.');
      return;
    }

    const headers = new HttpHeaders({
      "accept": "application/json",
    }).set("Authorization", `Bearer ${token}`);

    const url = `${environment.account_base_url}/api/lists/favorites`;

    this._http.get<any>(url, { headers: headers });
  }
}
