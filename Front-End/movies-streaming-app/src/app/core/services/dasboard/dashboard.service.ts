import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IAnalyticsCards{
  moviesCount:number,
  seriesCount:number,
  totalViews:number
}

export interface IMonthlyViews{
  [monthName: string]: number;
}
export interface IGenreViews{
  [genreName: string]: number;
}
export interface IUserStatistics{
  anonUsers: number,
  authUsers: number,
  subUsers : number,
}


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getAnalyticsCards():Observable< IAnalyticsCards>{
    const analyticsCards: IAnalyticsCards = {
      moviesCount: 1940,
      seriesCount: 3880,
      totalViews: 11500000
    };

    return of(analyticsCards);
  }

  getMonthlyViews():Observable<IMonthlyViews>{
    const  monthlyvies:IMonthlyViews = {
        Jan:120000,
        Feb:200000,
        Mar:139997,   
        Apr:99101,
    }
    return of(monthlyvies);
  }
  getGenreViews():Observable<IGenreViews>{
    const  genrevies:IGenreViews = {
        Comedy:120000,
        Action:200000,
        Drama:139997,   
        Horor:99101,
        Anime:78890,
        Romance:87960,
        Thriller:46890
    }
    return of(genrevies);
  }

  getUserStatistics():Observable< IUserStatistics>{
    const userStatistics: IUserStatistics = {
      anonUsers: 2940,
      authUsers: 4880,
      subUsers: 1383
    };
    return of (userStatistics);
  }
}
