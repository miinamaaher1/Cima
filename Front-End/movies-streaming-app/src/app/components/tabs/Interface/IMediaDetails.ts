import { ICast } from "../../../core/interfaces/ICast";
import { IGenre } from "../../../core/interfaces/IGenre";

export interface IMediaDetails {
    countSeasons: number;
    countEpisodes: number;
    categories: IGenre[];
    description: string;
    cast: string[];
  }
  