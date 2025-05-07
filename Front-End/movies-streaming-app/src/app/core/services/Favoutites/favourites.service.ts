import { Injectable } from '@angular/core';
import { AccountService } from '../Account/account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { VideoType } from '../../dtos/VideoType';
import { MediaItem } from '../../dtos/MediaItemDto';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor(private _accounrtService: AccountService, private _http: HttpClient) { }

  // Add to favourites
  addToFavourites(body: MediaItem) {
    const token = this._accounrtService.getToken();
    if (!token) {
      console.error('User is not authenticated. Cannot add to favourites.');
      return;
    }

    const headers = new HttpHeaders({
      "accept": "application/json",
    }).set("Authorization", `Bearer ${token}`);

    const url = `${environment.account_base_url}/favourites`;
    this._http.post<any>(url, body, { headers: headers });
  }

  // Delete from favourites
  deleteFromFavourites(body: MediaItem) {
    const token = this._accounrtService.getToken();
    if (!token) {
      console.error('User is not authenticated. Cannot delete from favourites.');
      return;
    }

    const headers = new HttpHeaders({
      "accept": "application/json",
    }).set("Authorization", `Bearer ${token}`);

    const url = `${environment.account_base_url}/favourites`;
    const options = {
      headers: headers,
      body: body
    };

    this._http.delete<any>(url, options);
  }

  // Get favourites
  getFavourites(params: { id: number; videoType: VideoType }) {
    const token = this._accounrtService.getToken();
    if (!token) {
      console.error('User is not authenticated. Cannot get favourites.');
      return;
    }

    const headers = new HttpHeaders({
      "accept": "application/json",
    }).set("Authorization", `Bearer ${token}`);

    const url = `${environment.account_base_url}/favourites`;
    const queryParams = { id: params.id.toString(), videoType: params.videoType.toString() };

    this._http.get<any>(url, { headers: headers, params: queryParams });
  }
}
