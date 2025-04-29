import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { language } from "../../../utils/language.enum";
import { ISeriesList } from "../../../interfaces/ISeriesList";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class SeriesListServiceService {
    constructor(private _http: HttpClient) {}

    headers = new HttpHeaders()
        .set("Authorization", environment.token)
        .set("Accept", "application/json");

    // Popular tv series list
    getPopularTvSeries(page: number, lang: language): Observable<ISeriesList> {
        const endpoint = `/3/tv/popular`;
        const url =
            `${environment.base_url}${endpoint}?language=${lang}&page=${page}`;
        return this._http.get<ISeriesList>(url, { headers: this.headers });
    }

    // Top Rated tv series list
    getTopRatedTvSeries(page: number, lang: language): Observable<ISeriesList> {
        const endpoint = `/3/tv/top_rated`;
        const url =
            `${environment.base_url}${endpoint}?language=${lang}&page=${page}`;
        return this._http.get<ISeriesList>(url, { headers: this.headers });
    }

    // On Air tv series list
    getOnAirTvSeries(page: number, lang: language): Observable<ISeriesList> {
        const endpoint = `/3/tv/on_the_air`;
        const url =
            `${environment.base_url}${endpoint}?language=${lang}&page=${page}`;
        return this._http.get<ISeriesList>(url, { headers: this.headers });
    }

    // Airing Now tv series list
    getAiringTodayTvSeries(
        page: number,
        lang: language,
    ): Observable<ISeriesList> {
        const endpoint = `/3/tv/airing_today`;
        const url =
            `${environment.base_url}${endpoint}?language=${lang}&page=${page}`;
        return this._http.get<ISeriesList>(url, { headers: this.headers });
    }
}
