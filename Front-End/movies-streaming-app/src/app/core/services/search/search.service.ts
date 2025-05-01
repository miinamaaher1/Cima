import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { language } from '../../utils/language.enum';
import { IMovieList } from '../../interfaces/IMovieList';
import { ISeriesList } from '../../interfaces/ISeriesList';
import { IPersonDetailsList } from '../../interfaces/IPersonDetails';
import { IMediaList } from '../../interfaces/IMedia';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(private _http: HttpClient) { }

    headers = new HttpHeaders()
        .set("Authorization", environment.token)
        .set("Accept", "application/json");

    // Search In Movies
    SearchInMovies(word: string, adult: boolean, lang: language, page: number) {
        const endpoint = `/3/search/movie`;
        const url = `${environment.base_url}${endpoint}?query=${word}&include_adult=${adult}&language=${lang}&page=${page}`;
        return this._http.get<IMovieList>(url, { headers: this.headers });
    }

    SearchInMoviesGenre(genre_id: number, adult: boolean, lang: language, page: number) {
        const endpoint = `/3/discover/movie`;
        const url = `${environment.base_url}${endpoint}?with_genres=${genre_id}&include_adult=${adult}&language=${lang}&page=${page}`;
        return this._http.get<IMovieList>(url, { headers: this.headers });
    }

    // Search In Series
    SearchInSeries(word: string, adult: boolean, lang: language, page: number) {
        const endpoint = `/3/search/tv`;
        const url = `${environment.base_url}${endpoint}?query=${word}&include_adult=${adult}&language=${lang}&page=${page}`;
        return this._http.get<ISeriesList>(url, { headers: this.headers });
    }

    SearchInSeriesGenre(genre_id: number, adult: boolean, lang: language, page: number) {
        const endpoint = `/3/discover/tv`;
        const url = `${environment.base_url}${endpoint}?with_genres=${genre_id}&include_adult=${adult}&language=${lang}&page=${page}`;
        return this._http.get<ISeriesList>(url, { headers: this.headers });
    }

    // Search in actors
    SearchInActors(word: string, adult: boolean, lang: language, page: number) {
        const endpoint = `/3/search/person`;
        const url = `${environment.base_url}${endpoint}?query=${word}&include_adult=${adult}&language=${lang}&page=${page}`;
        return this._http.get<IPersonDetailsList>(url, { headers: this.headers });
    }

    // Search in actors
    SearchInAllMedia(word: string, adult: boolean, lang: language, page: number) {
        const endpoint = `/3/search/multi`;
        const url = `${environment.base_url}${endpoint}?query=${word}&include_adult=${adult}&language=${lang}&page=${page}`;
        return this._http.get<IMediaList>(url, { headers: this.headers });
    }

}
