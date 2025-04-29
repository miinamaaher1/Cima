import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { language } from "../../../utils/language.enum";
import { IMovieList } from "../../../interfaces/IMovieList";

@Injectable({
    providedIn: "root",
})
export class MovieListServiceService {
    constructor(private _http: HttpClient) {}

    headers = new HttpHeaders()
        .set("Authorization", environment.token)
        .set("Accept", "application/json");

    // Popular movie list
    getPopularMovies(page: number, lang: language): Observable<IMovieList> {
        const endpoint = `/3/movie/popular`;
        const url = `${environment.base_url}${endpoint}?language=${lang}&page=${page}`;
        return this._http.get<IMovieList>(url, { headers: this.headers });
    }


    // Top Rated Movies
    getTopRatedMovies(page: number, lang: language){
        const endpoint = `/3/movie/top_rated`;
        const url = `${environment.base_url}${endpoint}?language=${lang}&page=${page}`;
        return this._http.get<IMovieList>(url, { headers: this.headers });
    }

    // Upcoming movies 
    getUpcomingMovies(page: number, lang: language){
        const endpoint = `/3/movie/upcoming`;
        const url = `${environment.base_url}${endpoint}?language=${lang}&page=${page}`;
        return this._http.get<IMovieList>(url, { headers: this.headers });
    }

    // Now playing movies

    getNowplayingMovies(page: number, lang: language){
        const endpoint = `/3/movie/upcoming`;
        const url = `${environment.base_url}${endpoint}?language=${lang}&page=${page}`;
        return this._http.get<IMovieList>(url, { headers: this.headers });
    }
}
