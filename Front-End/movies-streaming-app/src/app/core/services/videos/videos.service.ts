import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  constructor(private _http: HttpClient) { }
  getMovieTrailer(videoId: string) {
    return this._http.get(`https://localhost:7126/api/video/stream/${videoId}`);
  }
}
