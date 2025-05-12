import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IStreamData } from '../../interfaces/istream-data';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  constructor(private _http: HttpClient) { }
  getTrailer(name: string) {
    return this._http.get<IStreamData[]>(`${environment.videos_url}/api/videos/stream?name=${name}`);
  }

  getMedia(name: string) {
    return this._http.get<IStreamData[]>(`${environment.videos_url}/api/videos/watch?name=${name}`);
  }
}
