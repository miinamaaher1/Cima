export interface ITranslation {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: ITranslationData;
  }
  
  export interface ITranslationData {
    homepage: string;
    overview: string;
    runtime: number;
    tagline: string;
    title: string;
  }
  