import { Component, Input } from '@angular/core';
import { SeriesService } from '../../../core/services/series/series.service';
import { language } from '../../../core/utils/language.enum';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon-component/icon.component';
import { VideosService } from '../../../core/services/videos/videos.service';
import { Router, RouterLink } from '@angular/router';
import { FavouritesService } from '../../../core/services/Favoutites/favourites.service';
import { VideoType } from '../../../core/dtos/VideoType';
import { AccountService } from '../../../core/services/Account/account.service';

@Component({
  selector: 'app-serie-card',
  imports: [IconComponent, CommonModule, RouterLink],
  templateUrl: './serie-card.component.html',
  styleUrl: './serie-card.component.css'
})
export class SerieCardComponent {
  @Input() id: number = 0;
  constructor(private seriesService: SeriesService, private videoService: VideosService, private accountService: AccountService, private favoritesService: FavouritesService, private router: Router) { }
  ngOnInit(): void {
    this.seriesService.getSeriesDetails(this.id, language.english).subscribe({
      next: (data) => {
        this.tags = data.genres.map(g => g.name);
        this.name = data.name;
        this.seasons = data.number_of_seasons
        this.episodes = data.number_of_episodes;
        this.videoService.getTrailer(this.name).subscribe({
          next: (data) => this.videoUrl = data.filter(s => s.quality == 360)[0].url,
          error: () => this.validSeries = false
        });
      },
      error: () => this.validSeries = false
    });
    this.seriesService.getSeriesCredits(this.id, language.english).subscribe({
      next: data => this.cast = data.cast.filter((_, i) => i <= 2).map(c => c.name),
      error: () => this.validSeries = false
    });
    this.seriesService.getSeriesImages(this.id).subscribe({
      next: data => {
        try {
          this.posterUrl = `https://image.tmdb.org/t/p/original/${data.backdrops[0].file_path}`;
          this.logoUrl = `https://image.tmdb.org/t/p/original/${data.logos[0].file_path}`
        }
        catch (error) {
          this.validSeries = false;
          console.log(error);
        }
      },
      error: () => this.validSeries = false
    });
  }
  IsInFavorites: boolean = false;
  validSeries: boolean = true;
  name: string = "";
  seasons: number = 0;
  episodes: number = 0;
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
  addToFavorites() {
    if (this.accountService.isLoggedIn())
      this.favoritesService.addToFavourites({ id: this.id, videoType: VideoType.Series }).subscribe({
        next: () => this.IsInFavorites = true,
        error: (error) => console.log(error)
      });
    else
      this.router.navigate(['/sign-in']);
  }
  removeFromFavorites() {
    if (this.accountService.isLoggedIn())
      this.favoritesService.deleteFromFavourites({ id: this.id, videoType: VideoType.Series }).subscribe({
        next: () => this.IsInFavorites = false,
        error: (error) => console.log(error)
      });
    else
      this.router.navigate(['/sign-in']);
  }
}
