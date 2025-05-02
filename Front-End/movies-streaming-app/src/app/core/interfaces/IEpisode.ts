export interface IEpisode {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
    crew: ICrewMember[];
    guest_stars: IGuestStar[];
}

export interface ICrewMember {
    job: string;
    department: string;
    credit_id: string;
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
}

export interface IGuestStar {
    character: string;
    credit_id: string;
    order: number;
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
}

export interface IEpisodeCollection {
    results: [
        {
            description: string;
            episode_count: number;
            group_count: number;
            id: string;
            name: string;
            type: number;
        },
    ];
    id: 219246;
}

export interface Group {
    id: string;
    name: string;
    order: number;
    episodes: IEpisode[];
    locked: boolean;
  }
  
  export interface IEpisodeCollectionDetails {
    description: string;
    episode_count: number;
    group_count: number;
    groups: Group[];
    id: string;
    name: string;
    network: string | null;
    type: number;
}