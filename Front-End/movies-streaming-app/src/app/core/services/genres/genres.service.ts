import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { language } from "../../utils/language.enum";
import { IGenreList } from "../../interfaces/IGenre";

@Injectable({
    providedIn: "root",
})
export class GenresService {
    constructor(private _http: HttpClient) {}

    headers = new HttpHeaders()
        .set("Authorization", environment.token)
        .set("Accept", "application/json");

    // get all movies genres
    getAllMovieGenres(lang : language){
        const endpoint = `/3/genre/movie/list`;
                const url =`${environment.base_url}${endpoint}?language=${lang}`;
                return this._http.get<IGenreList>(url, { headers: this.headers });
    }
    
    // get all movies genres
    getAllSeriesGenres(lang : language){
        const endpoint = `/3/genre/tv/list`;
                const url =`${environment.base_url}${endpoint}?language=${lang}`;
                return this._http.get<IGenreList>(url, { headers: this.headers });
    }

    
}
