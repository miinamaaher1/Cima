import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie/movie.service';
import { language } from '../../core/utils/language.enum';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "../shared/movie-card/movie-card.component";
import { SeriesService } from '../../core/services/series/series.service';
import { SerieCardComponent } from "../shared/serie-card/serie-card.component";


@Component({
  selector: 'app-tabs-related',
  imports: [CommonModule, MovieCardComponent, SerieCardComponent],
  templateUrl: './tabs-related.component.html',
})
export class TabsRelatedComponent implements OnInit {
  relatedIds: number[] = [];

  @Input() isSeries: boolean = true;
  @Input() mediaId: number = 219246

  constructor(private movieService: MovieService, private seriesService: SeriesService) { }
  ngOnInit(): void {
    this.getRelated();
    console.log(this.relatedIds);
  }

  getRelated() {
    if (this.isSeries) {
      this.seriesService.getSimilarTvSeries(this.mediaId, language.english).subscribe(
        {
          next: res => {
            this.relatedIds.push(...res.results.map((s) => s.id).slice(0, 12));
          },
          error: err=> console.log('failed to fetch similar series ids',err)
        }
      )
    }
    else {
      this.movieService.getSimilarMovies(this.mediaId, language.english).subscribe({
        next: response => {
          const similarMovies = response.results.slice(0, 12);

          this.relatedIds.push(...similarMovies.map((m) => m.id))
        },
        error: err => {
          console.error('Failed to fetch similar movies id:', err);
        }
      });
    }
  }


}
