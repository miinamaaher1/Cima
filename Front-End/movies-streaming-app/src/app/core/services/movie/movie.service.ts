import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { language } from "../../utils/language.enum";
import { IMovieDetails } from "../../interfaces/IMovieDetails";
import { ICreditList } from "../../interfaces/ICreditList";
import { IImageList } from "../../interfaces/IImageList";
import { IKeywordsList } from "../../interfaces/IKeywordsList";
import { IMovieList } from "../../interfaces/IMovieList";
import { IReviewList } from "../../interfaces/IReviewList";
import { ITranslationList } from "../../interfaces/ITranslationList";
import { IVideoDetailsList } from "../../interfaces/IVideoDetailsList";

@Injectable({
    providedIn: "root",
})
export class MovieService {
    constructor(private _http: HttpClient) {}

    headers = new HttpHeaders()
        .set("Authorization", environment.token)
        .set("Accept", "application/json");

    // Movie Details 
    getMovieDetails(id: number, lang: language) {
        const endpoint = `/3/movie/${id}`;
        const url =`${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<IMovieDetails>(url, { headers: this.headers });
    }

    // Movie Credits (Cast / Crew)
    getMovieCredits(id: number, lang: language) {
        const endpoint = `/3/movie/${id}/credits`;
        const url =`${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<ICreditList>(url, { headers: this.headers });
    }

    // Movie Images (posters / logos / backdrops)
    getMovieImages(id: number, lang: language) {
        const endpoint = `/3/movie/${id}/images`;
        const url =`${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<IImageList>(url, { headers: this.headers });
    }

    // Movie Keywords
    getMovieKeywords(id: number, lang: language) {
        const endpoint = `/3/movie/${id}/keywords`;
        const url =`${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<IKeywordsList>(url, { headers: this.headers });
    }

    // Movie Recomendations
    getMovieRecommendations(id: number, lang: language) {
        const endpoint = `/3/movie/${id}/recommendations`;
        const url =`${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<IMovieList>(url, { headers: this.headers });
    }

    // Movie Reviews
    getMovieReviews(id: number, lang: language) {
        const endpoint = `/3/movie/${id}/reviews`;
        const url =`${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<IReviewList>(url, { headers: this.headers });
    }

    // Similar Movies
    getSimilarMovies(id: number, lang: language) {
        const endpoint = `/3/movie/${id}/similar`;
        const url =`${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<IMovieList>(url, { headers: this.headers });
    }

    // Similar Movies
    getMovieTranslations(id: number, lang: language) {
        const endpoint = `/3/movie/${id}/translations`;
        const url =`${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<ITranslationList>(url, { headers: this.headers });
    }

    getMovieVideos(id: number, lang: language){
        const endpoint = `/3/movie/${id}/videos`;
        const url =`${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<IVideoDetailsList>(url, { headers: this.headers });
    }
}
