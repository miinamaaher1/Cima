import { Component, Input, signal } from '@angular/core';
import { SeriesService } from '../../../core/services/series/series.service';
import { language } from '../../../core/utils/language.enum';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon-component/icon.component';
import { VideosService } from '../../../core/services/videos/videos.service';
import { Router, RouterLink } from '@angular/router';
import { FavoritesService } from '../../../core/services/Favoutites/favourites.service';
import { VideoType } from '../../../core/dtos/VideoType';
import { WatchlistService } from '../../../core/services/Watchlist/watchlist.service';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-serie-card',
  imports: [IconComponent, CommonModule, RouterLink],
  templateUrl: './serie-card.component.html'
})
export class SerieCardComponent {
  @Input({ required: true }) id!: number;
  constructor(private seriesService: SeriesService, private videoService: VideosService, private router: Router, 
    private favoriteService: FavoritesService , private watchLisatService:WatchlistService ,private userService :UserService) { }
  ngOnInit(): void {
    if (!this.id || this.id <= 0) {
      this.validSeries = false;
      return;
    }
    this.seriesService.getSeriesDetails(this.id, language.english).subscribe({
      next: (data) => {
        this.tags = data.genres.map(g => g.name);
        this.name = data.name;
        this.seasons = data.number_of_seasons
        this.episodes = data.number_of_episodes;
        this.discription = data.overview.length > 100 ? data.overview.slice(0, 97) + "..." : data.overview;
        this.videoService.getTrailer(this.name).subscribe({
          next: (data) => this.videoUrl = data.filter(s => s.quality == 360)[0].url,
          error: () => this.videoUrl = "/videos/clips/G_O_T_Clip.mp4"
        });
      },
      error: (err) => {
        console.log(err);
        this.validSeries = false;
      }
    });
    this.seriesService.getSeriesCredits(this.id, language.english).subscribe({
      next: data => this.cast = data.cast.filter((_, i) => i <= 2).map(c => c.name),
      error: () => this.cast = ["Unknown"]
    });
    this.seriesService.getSeriesImages(this.id).subscribe({
      next: data => {
        try {
          this.posterUrl = `https://image.tmdb.org/t/p/original/${data.backdrops[0].file_path}`;
          this.logoUrl = `https://image.tmdb.org/t/p/original/${data.logos[0].file_path}`
        }
        catch (error) {
          console.log(error);
        }
      },
      error: (err) => console.log(err)
    });

    this.isFavorite();
    this.isListed();
  }

  IsInWatchList = signal<boolean>(false);
  IsInFavorites = signal<boolean>(false); 
  validSeries: boolean = true;
  name: string = "";
  seasons: number = 0;
  episodes: number = 0;
  posterUrl: string = "";
  logoUrl: string = "";
  discription: string = "";
  videoUrl: string = "";
  cast: string[] = [];
  tags: string[] = [];
  timerHandler: any;
  isPlaying: boolean = false;
  playVideo($event: MouseEvent) {
    if (!this.timerHandler) {
      this.timerHandler = setTimeout(() => {
        ($event.target as HTMLVideoElement).load();
        ($event.target as HTMLVideoElement).muted = true;
        ($event.target as HTMLVideoElement).loop = true;
        ($event.target as HTMLVideoElement).play().then(() => {
          this.isPlaying = true;
        }).catch(() => {
          this.isPlaying = false;
        });
      }, 1000);
    }
  }
  stopVideo($event: MouseEvent) {
    if (this.timerHandler) {
      clearTimeout(this.timerHandler);
      this.timerHandler = null;
      ($event.target as HTMLVideoElement).pause();
      ($event.target as HTMLVideoElement).load();
      this.isPlaying = false;
    }
  }
  toggleFavoriteItem() {
    if (this.userService.isLoggedIn()) {
      if (this.IsInFavorites()) {
        this.favoriteService.deleteFromFavorites({ id: this.id, videoType: VideoType.Series }).subscribe({
          next: () => this.IsInFavorites.set(false),
          error: () => { } // console.log(error)
        })
      }
      else {
        this.favoriteService.addToFavorites({ id: this.id, videoType: VideoType.Series }).subscribe({
          next: () => this.IsInFavorites.set(true),
          error: () => { } // console.log(error)
        })
      }
    }
    else {
      this.router.navigate(['/sign-in']);
    }

  }

  toggleListItem() {
    if (this.userService.isLoggedIn()) {
      if (this.IsInWatchList()) {
        this.watchLisatService.deleteFromWatchlist({ id: this.id, videoType: VideoType.Series }).subscribe({
          next: () => this.IsInWatchList.set(false),
          error: () => { } // console.log(error)
        })
      }
      else {
        this.watchLisatService.addToWatchlist({ id: this.id, videoType: VideoType.Series }).subscribe({
          next: () => this.IsInWatchList.set(true),
          error: () => { } // console.log(error)
        })
      }
    }
    else {
      this.router.navigate(['/sign-in']);
    }
  }

  isListed() {
    if (this.userService.isLoggedIn()) {
      this.watchLisatService.getWatchlist().subscribe({
        next: res => {
          const isListed = res.map(l => l.id).includes(this.id);
          this.IsInWatchList.set(isListed);
        },
        error: err => console.error(err)
      });
    }
  }

  isFavorite() {
    if (this.userService.isLoggedIn()) {
      this.favoriteService.getFavorites().subscribe({
        next: res => {
          const isFav = res.map(l => l.id).includes(this.id);
          this.IsInFavorites.set(isFav);
        },
        error: err => console.error(err)
      });
    }
  }
}
