import { IEpisode } from "./IEpisode";

export interface ISeasonDetails {
    _id : string ,
    episodes : IEpisode[],
    air_date: string,
    name: string,
    overview: string,
    id: number,
    poster_path: string | null,
    season_number: number,
    vote_average: number
}