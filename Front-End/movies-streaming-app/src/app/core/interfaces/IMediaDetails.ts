import { IGenre } from "./IGenre";


export interface IMediaDetails {
    countSeasons: number;
    countEpisodes: number;
    categories: IGenre[];
    description: string;
    cast: string[];
  }
