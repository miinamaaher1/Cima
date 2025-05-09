import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon-component/icon.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../core/services/movie/movie.service';
import { language } from '../../../core/utils/language.enum';
import { VideosService } from '../../../core/services/videos/videos.service';
import { Router, RouterLink } from '@angular/router';
import { FormatTimePipe } from '../../../core/pipes/format-time.pipe';
import { AccountService } from '../../../core/services/Account/account.service';
import { FavoritesService } from '../../../core/services/Favoutites/favourites.service';
import { VideoType } from '../../../core/dtos/VideoType';
import { WatchlistService } from '../../../core/services/Watchlist/watchlist.service';
import { error } from 'console';

@Component({
  selector: 'app-movie-card',
  imports: [IconComponent, CommonModule, RouterLink, FormatTimePipe],
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent {
  @Input() id: number = 0;
  constructor(private movieService: MovieService, private videoService: VideosService, private router: Router, private accountService: AccountService, private favoriteService: FavoritesService, private watchLisatService: WatchlistService) { }
  ngOnInit(): void {
    this.movieService.getMovieDetails(this.id, language.english).subscribe({
      next: (data) => {
        this.tags = data.genres.map(g => g.name);
        this.name = data.title;
        this.runtime = data.runtime;
        this.discription = data.overview.length > 100 ? data.overview.slice(0, 97) + "..." : data.overview;
        this.videoService.getTrailer(this.name).subscribe({
          next: (data) => this.videoUrl = data.filter(s => s.quality == 360)[0].url,
          error: () => this.videoUrl = "/videos/clips/G_O_T_Clip.mp4"
        });
      },
      error: (err) => console.log(err)
    });
    this.movieService.getMovieCredits(this.id, language.english).subscribe({
      next: data => this.cast = data.cast.filter((_, i) => i <= 2).map(c => c.name),
      error: () => this.cast = ["Unknown"]
    });
    this.movieService.getMovieImages(this.id).subscribe({
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
  }

  IsInWatchList: boolean = false;
  IsInFavorites: boolean = false;
  validMovie: boolean = true;
  name: string = "";
  runtime: number = 0;
  discription: string = "";
  posterUrl: string = "";
  logoUrl: string = "";
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
        }).catch(error => {
          console.error("video playback failed")
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
  addToFavorites() {
    if (this.accountService.isLoggedIn())
      this.favoriteService.addToFavorites({ id: this.id, videoType: VideoType.Movie }).subscribe({
        next: () => this.IsInFavorites = true,
        error: (error) => console.log(error)
      });
    else
      this.router.navigate(['/sign-in']);
  }
  removeFromFavorites() {
    if (this.accountService.isLoggedIn())
      this.favoriteService.deleteFromFavorites({ id: this.id, videoType: VideoType.Movie }).subscribe({
        next: () => this.IsInFavorites = false,
        error: (error) => console.log(error)
      });
    else
      this.router.navigate(['/sign-in']);
  }

  toggleListItem() {
    if (this.accountService.isLoggedIn()) {
      if (this.isListed()) {
        this.watchLisatService.deleteFromWatchlist({ id: this.id, videoType: VideoType.Movie }).subscribe({
          next: () => this.IsInWatchList = false,
          error: () => console.log(error)
        })
      }
      else {
        this.watchLisatService.addToWatchlist({ id: this.id, videoType: VideoType.Movie }).subscribe({
          next: () => this.IsInWatchList = true,
          error: () => console.log(error)
        })
      }
    }
    else {
      this.router.navigate(['/sign-in']);
    }
  }

  isListed(): boolean {
    return this.watchLisatService.getWatchlist().subscribe({
      next: res => {
        res.map(l => l.id).includes(this.id)
      }
    }) ? true : false;
  }
}
