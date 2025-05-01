import { Component, Input, OnInit } from '@angular/core';
import { IRelatedMovie } from './Interfaces/IRelatedMovie';
import { MovieService } from '../../core/services/movie/movie.service';
import { language } from '../../core/utils/language.enum';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tabs-related',
  imports: [CommonModule],
  templateUrl: './tabs-related.component.html',
})
export class TabsRelatedComponent implements OnInit {
  RelatedMovies:IRelatedMovie[]=[];
  @Input() movieId:number=0

  constructor(private movieService:MovieService){}
  ngOnInit(): void {
    // this.getRelated(this.movieId);
    this.getRelated(315635);
    console.log(this.RelatedMovies);
  }

  getRelated(movieId: number) {
    this.movieService.getSimilarMovies(movieId, language.english).subscribe({
      next: response => {
        const moviesToFetch = response.results.slice(0, 12);
  
        moviesToFetch.forEach(movie => {
          this.movieService.getMovieDetails(movie.id, language.english).subscribe({
            next: details => {
              const related: IRelatedMovie = {
                name: details.title,
                posterUrl: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
                runtime: details.runtime,
                categories: details.genres.map(g => g.name),
                link: `/movies/${details.id}`,
              };
              this.RelatedMovies.push(related);
            },
            error: err => {
              console.error(`Failed to fetch details for movie ID ${movie.id}:`, err);
            }
          });
        });
      },
      error: err => {
        console.error('Failed to fetch similar movies:', err);
      }
    });
  }
  

}
