import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon-component/icon.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../core/services/movie/movie.service';
import { language } from '../../../core/utils/language.enum';
import { VideosService } from '../../../core/services/videos/videos.service';
import { environment } from '../../../core/environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [IconComponent, CommonModule, RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() id: number = 0;
  constructor(private movieService: MovieService, private videoService: VideosService) { }
  ngOnInit(): void {
    this.movieService.getMovieDetails(this.id, language.english).subscribe({
      next: (data) => {
        this.tags = data.genres.map(g => g.name);
        this.name = data.title;
        this.hours = Math.floor(data.runtime / 60);
        this.minutes = data.runtime % 60;
      },
      error: () => this.validMovie = false
    });
    this.movieService.getMovieCredits(this.id, language.english).subscribe({
      next: data => this.cast = data.cast.filter((_, i) => i <= 2).map(c => c.name),
      error: () => this.validMovie = false
    });
    this.movieService.getMovieImages(this.id).subscribe({
      next: data => {
        try {
          this.posterUrl = `https://image.tmdb.org/t/p/original/${data.backdrops[0].file_path}`;
        }
        catch (error) {
          this.validMovie = false;
          console.log(error);
        }
      },
      error: () => this.validMovie = false
    });
    this.videoService.checkTrailer(this.id).subscribe({
      next: () => { },
      error: () => this.validMovie = false
    })
    this.videoUrl = `${environment.videos_url}/api/video/stream?tmdbId=${this.id}`;
  }
  validMovie: boolean = true;
  name: string = "";
  hours: number = 0;
  minutes: number = 0;
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
