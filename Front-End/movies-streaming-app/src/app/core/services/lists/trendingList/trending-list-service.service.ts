import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { language } from '../../../utils/language.enum';
import { IMovieList } from '../../../interfaces/IMovieList';
import { ISeries } from '../../../interfaces/ISeries';
import { ISeriesList } from '../../../interfaces/ISeriesList';
import { IPersonList } from '../../../interfaces/IPersonList';

@Injectable({
  providedIn: 'root'
})
export class TrendingListServiceService {

    constructor(private _http: HttpClient) {}

    headers = new HttpHeaders()
        .set("Authorization", environment.token)
        .set("Accept", "application/json");

    getTrendingMoviesToday(page: number, lang: language){
        const endpoint = `/3/trending/movie/day`;
                const url = `${environment.base_url}${endpoint}?language=${lang}&page=${page}`;
                return this._http.get<IMovieList>(url, { headers: this.headers });
    }

    getTrendingMoviesThisWeek(page: number, lang: language){
        const endpoint = `/3/trending/movie/week`;
                const url = `${environment.base_url}${endpoint}?language=${lang}&page=${page}`;
                return this._http.get<IMovieList>(url, { headers: this.headers });
    }


    getTrendingSeriesToday(page: number, lang: language){
        const endpoint = `/3/trending/tv/day`;
                const url = `${environment.base_url}${endpoint}?language=${lang}&page=${page}`;
                return this._http.get<ISeriesList>(url, { headers: this.headers });
    }

    getTrendingSeriesThisWeek(page: number, lang: language){
        const endpoint = `/3/trending/tv/week`;
                const url = `${environment.base_url}${endpoint}?language=${lang}&page=${page}`;
                return this._http.get<ISeriesList>(url, { headers: this.headers });
    }



    getTrendingPeopleToday(page: number, lang: language){
        const endpoint = `/3/trending/person/day`;
                const url = `${environment.base_url}${endpoint}?language=${lang}&page=${page}`;
                return this._http.get<IPersonList>(url, { headers: this.headers });
    }

    getTrendingPeopleThisWeek(page: number, lang: language){
        const endpoint = `/3/trending/person/week`;
                const url = `${environment.base_url}${endpoint}?language=${lang}&page=${page}`;
                return this._http.get<IPersonList>(url, { headers: this.headers });
    }
}
