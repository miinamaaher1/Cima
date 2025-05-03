import { Component, Input } from '@angular/core';
import { SeriesService } from '../../../core/services/series/series.service';
import { language } from '../../../core/utils/language.enum';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon-component/icon.component';
import { VideosService } from '../../../core/services/videos/videos.service';
import { environment } from '../../../core/environments/environment';

@Component({
  selector: 'app-serie-card',
  imports: [IconComponent, CommonModule],
  templateUrl: './serie-card.component.html',
  styleUrl: './serie-card.component.css'
})
export class SerieCardComponent {
  @Input() id: number = 0;
  constructor(private seriesService: SeriesService, private videoService: VideosService) { }
  ngOnInit(): void {
    this.seriesService.getSeriesDetails(this.id, language.english).subscribe({
      next: (data) => {
        this.tags = data.genres.map(g => g.name);
        this.name = data.name;
        this.seasons = data.number_of_seasons
        this.episodes = data.number_of_episodes;
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
        }
        catch (error) {
          this.validSeries = false;
          console.log(error);
        }
      },
      error: () => this.validSeries = false
    });
    this.videoService.checkTrailer(this.id).subscribe({
      next: () => { },
      error: () => this.validSeries = false
    })
    this.videoUrl = `${environment.videos_url}/api/video/stream?tmdbId=${this.id}`;
  }
  validSeries: boolean = true;
  name: string = "";
  seasons: number = 0;
  episodes: number = 0;
  posterUrl: string = "";
  videoUrl: string = "";
  cast: string[] = [];
  tags: string[] = [];
  timerHandler: any;
  playState: string = "";
  playVideo($event: MouseEvent) {
    if (!this.timerHandler) {
      this.timerHandler = setTimeout(() => {
        ($event.target as HTMLVideoElement).muted = true;
        ($event.target as HTMLVideoElement).loop = true;
        ($event.target as HTMLVideoElement).play();
      }, 1000);
    }
  }
  stopVideo($event: MouseEvent) {
    if (this.timerHandler) {
      clearTimeout(this.timerHandler);
      this.timerHandler = null;
      ($event.target as HTMLVideoElement).pause();
      ($event.target as HTMLVideoElement).load();
    }
  }
}
