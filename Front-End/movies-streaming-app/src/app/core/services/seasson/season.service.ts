import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { language } from "../../utils/language.enum";
import { ISeasonDetails } from "../../interfaces/ISeasonDetails";
import { ICreditList } from "../../interfaces/ICreditList";

@Injectable({
    providedIn: "root",
})
export class SeasonService {
    constructor(private _http: HttpClient) {}

    headers = new HttpHeaders()
        .set("Authorization", environment.token)
        .set("Accept", "application/json");

    // get Season Details
    getSeasonDetails(seriesId: number, seasonId: number, lang : language) {
        const endpoint = `/3/tv/${seriesId}/season/${seriesId}'`;
        const url = `${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<ISeasonDetails>(url, { headers: this.headers });
    }

    // get Seasson Credits
    getSeasonCredits(seriesId: number, seasonId: number, lang : language) {
        const endpoint = `/3/tv/${seriesId}/season/${seriesId}'`;
        const url = `${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<ICreditList>(url, { headers: this.headers });
    }



}
