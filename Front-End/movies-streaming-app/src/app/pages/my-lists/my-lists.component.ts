import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/shared/movie-card/movie-card.component";
import { SerieCardComponent } from "../../components/shared/serie-card/serie-card.component";
import { FavoritesService } from '../../core/services/Favoutites/favourites.service';
import { VideoType } from '../../core/dtos/VideoType';
import { WatchlistService } from '../../core/services/Watchlist/watchlist.service';

@Component({
  selector: 'app-my-lists',
  imports: [MovieCardComponent, SerieCardComponent],
  templateUrl: './my-lists.component.html'
})
export class MyListsComponent implements OnInit {

  isLoading: boolean = false;
  watchlistSeriesIds: number[] = [13945, 13945, 13945, 13945, 13945, 13945, 13945]
  watchlistMovieIds: number[] = [1124620, 1124620, 1124620, 1124620, 1124620, 1124620]
  favoriteSeriesIds: number[] = [13945, 13945, 13945, 13945, 13945, 13945, 13945]
  favoriteMovieIds: number[] = [1124620, 1124620, 1124620, 1124620, 1124620, 1124620]

  constructor(private _favoritesService: FavoritesService, private _watchlistService: WatchlistService) { }

  ngOnInit(): void {
    this.fetchFavoriteMedia();
    this.fetchWatchlistMedia();
  }

  fetchFavoriteMedia() {
    this.isLoading = true;
    let favMovies: number[] = []
    let favSeries: number[] = []

    this._favoritesService.getFavorites().subscribe({
      next: fav => {
        fav.forEach(fav => {
          if (fav.videoType === VideoType.Movie) {
            favMovies.push(fav.id);
          }
          else {
            favSeries.push(fav.id);
          }
        })
        this.favoriteMovieIds = favMovies;
        this.favoriteSeriesIds = favSeries;
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
        console.error(err);
      }
    })
  }

  fetchWatchlistMedia() {
    this.isLoading = true;
    let watchMovies: number[] = []
    let watchSeries: number[] = []

    this._watchlistService.getWatchlist().subscribe({
      next: wlist => {
        wlist.forEach(w => {
          if (w.videoType === VideoType.Movie) {
            watchMovies.push(w.id);
          }
          else {
            watchSeries.push(w.id);
          }
        })
        this.watchlistMovieIds = watchMovies;
        this.watchlistSeriesIds = watchSeries;
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
        console.error(err);
      }
    })
  }


}
