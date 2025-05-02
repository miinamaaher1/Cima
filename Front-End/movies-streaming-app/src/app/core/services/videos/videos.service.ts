import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  constructor(private _http: HttpClient) { }
  getTrailer(id: number) {
    return this._http.get<string>(`${environment.videos_url}/api/video/stream?tmdbId=${id}`);
  }
}
