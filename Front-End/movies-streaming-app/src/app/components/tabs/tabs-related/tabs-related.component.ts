import { Component, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../core/services/movie/movie.service';
import { SeriesService } from '../../../core/services/series/series.service';
import { language } from '../../../core/utils/language.enum';
import { mediaType } from '../../../core/utils/media-type.enum';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';
import { SerieCardComponent } from '../../shared/serie-card/serie-card.component';


@Component({
  selector: 'app-tabs-related',
  imports: [CommonModule, MovieCardComponent, SerieCardComponent],
  templateUrl: './tabs-related.component.html',
})
export class TabsRelatedComponent implements OnInit, OnChanges {
  relatedIds: number[] = [];

  isSeries : boolean = false;
  mediaType = input.required<mediaType>()
  mediaId = input.required<number>()

  constructor(private movieService: MovieService, private seriesService: SeriesService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.isSeries = this.mediaType() === mediaType.series;
    this.getRelated();
  }

  ngOnInit(): void {
    this.isSeries = this.mediaType() === mediaType.series;
    this.getRelated();
  }

  getRelated() {
    if (this.mediaType() === mediaType.series) {
      this.seriesService.getSimilarTvSeries(this.mediaId(), language.english).subscribe(
        {
          next: res => {
            this.relatedIds = res.results.map((s) => s.id).slice(0, 12);
          },
          error: err=> console.log('failed to fetch similar series ids',err)
        }
      )
    }
    else {
      this.movieService.getSimilarMovies(this.mediaId(), language.english).subscribe({
        next: response => {
          const similarMovies = response.results.slice(0, 12);

          this.relatedIds = similarMovies.map((m) => m.id)
        },
        error: err => {
          console.error('Failed to fetch similar movies id:', err);
        }
      });
    }
  }


}
