import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie/movie.service';
import { language } from '../../core/utils/language.enum';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "../shared/movie-card/movie-card.component";
import { SeriesService } from '../../core/services/series/series.service';


@Component({
  selector: 'app-tabs-related',
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './tabs-related.component.html',
})
export class TabsRelatedComponent implements OnInit {
  relatedIds:number[]=[];

  @Input() isSeries:boolean = false;
  @Input() movieId:number=315635

  constructor(private movieService:MovieService ,private seriesService:SeriesService){}
  ngOnInit(): void {
    // this.getRelated(this.movieId);
    this.getRelated();
    console.log(this.relatedIds);
  }

  getRelated() {
    if(this.isSeries)
    {
      this.seriesService.getSimilarTvSeries
    }

    this.movieService.getSimilarMovies(this.movieId, language.english).subscribe({
      next: response => {
        const moviesToFetch = response.results.slice(0, 12);
        
        this.relatedIds.push(...moviesToFetch.map((m)=>m.id))
      },
      error: err => {
        console.error('Failed to fetch similar movies:', err);
      }
    });
  }
  

}
