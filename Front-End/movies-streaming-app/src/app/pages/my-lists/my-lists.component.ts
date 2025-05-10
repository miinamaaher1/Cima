import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/shared/movie-card/movie-card.component";
import { SerieCardComponent } from "../../components/shared/serie-card/serie-card.component";
import { FavoritesService } from '../../core/services/Favoutites/favourites.service';
import { VideoType } from '../../core/dtos/VideoType';
import { WatchlistService } from '../../core/services/Watchlist/watchlist.service';
import { MediaItem } from '../../core/dtos/MediaItemDto';

@Component({
  selector: 'app-my-lists',
  standalone: true,
  imports: [MovieCardComponent, SerieCardComponent],
  templateUrl: './my-lists.component.html',
})
export class MyListsComponent implements OnInit {

  isLoading: boolean = false;

  watchlistSeriesIds: number[] = [];
  watchlistMovieIds: number[] = [];

  favoriteSeriesIds: number[] = [];
  favoriteMovieIds: number[] = [];

  constructor(
    private _favoritesService: FavoritesService,
    private _watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    this.fetchFavoriteMedia();
    this.fetchWatchlistMedia();
  }

  fetchFavoriteMedia(): void {
    this.isLoading = true;
    this._favoritesService.getFavorites().subscribe({
      next: (fav: MediaItem[]) => {
        this.favoriteMovieIds = fav.filter(f => f.videoType === VideoType.Movie).map(f => f.id);
        this.favoriteSeriesIds = fav.filter(f => f.videoType !== VideoType.Movie).map(f => f.id);
        this.isLoading = false;
      },
      error: err => {
        console.error('Error fetching favorites:', err);
        this.isLoading = false;
      }
    });
  }

  fetchWatchlistMedia(): void {
    this.isLoading = true;
    this._watchlistService.getWatchlist().subscribe({
      next: (wlist: MediaItem[]) => {
        this.watchlistMovieIds = wlist.filter(w => w.videoType === VideoType.Movie).map(w => w.id);
        this.watchlistSeriesIds = wlist.filter(w => w.videoType !== VideoType.Movie).map(w => w.id);
        this.isLoading = false;
      },
      error: err => {
        console.error('Error fetching watchlist:', err);
        this.isLoading = false;
      }
    });
  }

}
