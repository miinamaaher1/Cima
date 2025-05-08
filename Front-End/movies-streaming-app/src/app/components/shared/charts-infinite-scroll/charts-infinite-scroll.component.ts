import { Component } from '@angular/core';
import { ICarouselData } from '../../../core/interfaces/icarousel-data';
import { IGenre } from '../../../core/interfaces/IGenre';
import { MovieListServiceService } from '../../../core/services/lists/movieList/movie-list-service.service';
import { SeriesListServiceService } from '../../../core/services/lists/seriesList/series-list-service.service';
import { CollectionType } from '../../../core/utils/collection-type';
import { language } from '../../../core/utils/language.enum';
import { MovieCarouselComponent } from "../movie-carousel/movie-carousel.component";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-charts-infinite-scroll',
  imports: [MovieCarouselComponent, InfiniteScrollDirective],
  templateUrl: './charts-infinite-scroll.component.html'
})
export class ChartsInfiniteScrollComponent {
  items: ICarouselData[] = [];
    moviesList: number[] = [];
    MoviesGenresList: IGenre[] = [];
    SeriesGenresList: IGenre[] = [];
    currentMoviesGenresIndex = 0;
    currentSeriesGenresIndex = 0;

    constructor(private _movieListService: MovieListServiceService,
      private _seriesListServiceService: SeriesListServiceService,
    ) { }

    ngOnInit(): void {


      this._movieListService.getPopularMovies(1, language.english).subscribe(
        {
          next: (data) => {
            // console.log(data);
            this.items.push({
              title: "Popular Movies",
              moviesIdsList: data.results.filter(m => m.adult == false && m.backdrop_path).map(m => m.id),
              collectionType: CollectionType.Movies
            })
          },
          error: (err) => {
            console.log(err);

          }
        }
      );

      this._movieListService.getTopRatedMovies(1, language.english).subscribe(
        {
          next: (data) => {
            // console.log(data);
            this.items.push({
              title: "Top Rated Movies",
              moviesIdsList: data.results.filter(m => m.adult == false && m.backdrop_path).map(m => m.id),
              collectionType: CollectionType.Movies
            })
          },
          error: (err) => {
            console.log(err);

          }
        }
      );


      this._seriesListServiceService.getPopularTvSeries(1, language.english).subscribe(
        {
          next: (data) => {
            // console.log(data);
            this.items.push({
              title: "Popular Tv Series",
              moviesIdsList: data.results.filter(m => m.adult == false && m.backdrop_path).map(m => m.id),
              collectionType: CollectionType.Series
            })
          },
          error: (err) => {
            console.log(err);

          }
        }
      );
      this._seriesListServiceService.getTopRatedTvSeries(1, language.english).subscribe(
        {
          next: (data) => {
            // console.log(data);
            this.items.push({
              title: "Top Rated Tv Series",
              moviesIdsList: data.results.filter(m => m.adult == false && m.backdrop_path).map(m => m.id),
              collectionType: CollectionType.Series
            })
          },
          error: (err) => {
            console.log(err);

          }
        }
      );
    }


}
