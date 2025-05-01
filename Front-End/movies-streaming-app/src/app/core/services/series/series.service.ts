import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { language } from "../../utils/language.enum";
import { ISeriesDetails } from "../../interfaces/ISeriesDetails";
import { ICreditList } from "../../interfaces/ICreditList";
import { IImageList } from "../../interfaces/IImageList";
import { ISeriesList } from "../../interfaces/ISeriesList";
import { IReviewList } from "../../interfaces/IReviewList";
import { IVideoDetailsList } from "../../interfaces/IVideoDetailsList";
import { IEpisodeCollection, IEpisodeCollectionDetails } from '../../interfaces/IEpisode';

@Injectable({
    providedIn: "root",
})
export class SeriesService {
    constructor(private _http: HttpClient) {}

    headers = new HttpHeaders()
        .set("Authorization", environment.token)
        .set("Accept", "application/json");

    // tv series details
    getSeriesDetails(id: number, lang: language) {
        const endpoint = `/3/tv/${id}`;
        const url = `${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<ISeriesDetails>(url, { headers: this.headers });
    }

    // tv series credits 
    getSeriesCredits(id: number, lang: language) {
        const endpoint = `/3/tv/${id}/aggregate_credits`;
        const url = `${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<ICreditList>(url, { headers: this.headers });
    }

    // tv series images
    getSeriesImages(id: number) {
        const endpoint = `/3/tv/${id}/images`;
        const url = `${environment.base_url}${endpoint}`;
        return this._http.get<IImageList>(url, { headers: this.headers });
    }

    // tv series keywords
    getSeriesKeywords(id: number) {
        const endpoint = `/3/tv/${id}/keywords`;
        const url = `${environment.base_url}${endpoint}`;
        return this._http.get<IImageList>(url, { headers: this.headers });
    }

    // tv series reviews
    getSeriesReviews(id: number, lang: language) {
        const endpoint = `/3/tv/${id}/reviews`;
        const url = `${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<IReviewList>(url, { headers: this.headers });
    }

    // tv series recommendations
    getSeriesRecomendations(id: number, lang: language) {
        const endpoint = `/3/tv/${id}/recommendations`;
        const url = `${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<ISeriesList>(url, { headers: this.headers });
    }

    // similar tv series
    getSimilarTvSeries(id: number, lang: language) {
        const endpoint = `/3/tv/${id}/similar`;
        const url = `${environment.base_url}${endpoint}?language=${lang}`;
        return this._http.get<ISeriesList>(url, { headers: this.headers });
    }

    // tv series videos 
    getSeriesVideos(id: number) {
        const endpoint = `/3/tv/${id}/videos`;
        const url = `${environment.base_url}${endpoint}`;
        return this._http.get<IVideoDetailsList>(url, { headers: this.headers });
    }


    // get the episode collections of a tv series 
    getSeriesCollections(id: number) {
        const endpoint = `/3/tv/${id}/episode_groups`;
        const url = `${environment.base_url}${endpoint}`;
        return this._http.get<IEpisodeCollection>(url, { headers: this.headers });
    }


    getCollectionDetails(id: string) {
        const endpoint = `/3/tv/episode_group/${id}`;
        const url = `${environment.base_url}${endpoint}`;
        return this._http.get<IEpisodeCollectionDetails>(url, { headers: this.headers });
    }
    
    
}
