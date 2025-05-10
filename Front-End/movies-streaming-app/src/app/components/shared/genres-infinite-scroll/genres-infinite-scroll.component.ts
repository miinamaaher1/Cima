import { Component } from '@angular/core';
import { ICarouselData } from '../../../core/interfaces/icarousel-data';
import { IGenre } from '../../../core/interfaces/IGenre';
import { GenresService } from '../../../core/services/genres/genres.service';
import { MovieListServiceService } from '../../../core/services/lists/movieList/movie-list-service.service';
import { SeriesListServiceService } from '../../../core/services/lists/seriesList/series-list-service.service';
import { SearchService } from '../../../core/services/search/search.service';
import { CollectionType } from '../../../core/utils/collection-type';
import { language } from '../../../core/utils/language.enum';
import { MovieCarouselComponent } from "../movie-carousel/movie-carousel.component";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-genres-infinite-scroll',
  imports: [MovieCarouselComponent, InfiniteScrollDirective],
  templateUrl: './genres-infinite-scroll.component.html'
})
export class GenresInfiniteScrollComponent {
  items: ICarouselData[] = [];
    moviesList: number[] = [];
    MoviesGenresList: IGenre[] = [];
    SeriesGenresList: IGenre[] = [];
    currentMoviesGenresIndex = 0;
    currentSeriesGenresIndex = 0;

    constructor(private _movieListService: MovieListServiceService,
      private _seriesListServiceService: SeriesListServiceService,
      private _searchService: SearchService,
      private _genresService: GenresService,
    ) { }

    ngOnInit(): void {
      this._genresService.getAllMovieGenres(language.english).subscribe
        ({
          next: (data) => {
            // console.log(data);
            this.MoviesGenresList.push(...data.genres.filter(g => g.name != "Romance"))

          },
          error: (err) => {
            console.log(err);
          }
        });

      this._genresService.getAllSeriesGenres(language.english).subscribe
        ({
          next: (data) => {
            // console.log(data);
            this.SeriesGenresList.push(...data.genres)

          },
          error: (err) => {
            console.log(err);
          }
        });

        this.loadMoreItems()
    }

    loadMoreItems() {
      if (this.currentMoviesGenresIndex < this.MoviesGenresList.length) {
        this.moviesSearch(this.MoviesGenresList[this.currentMoviesGenresIndex]);
        this.currentMoviesGenresIndex++;
      }
      if (this.currentSeriesGenresIndex <= this.SeriesGenresList.length) {
        this.seriesSearch(this.SeriesGenresList[this.currentSeriesGenresIndex]);
        this.currentSeriesGenresIndex++;
      }
      // console.log("allllllll items", this.items);
    }

    moviesSearch(searchBy: IGenre) {
      this._searchService.SearchInMoviesGenre(searchBy.id, false, language.english, 1)
        .subscribe({
          next: (data) => {
            // console.log("searchBy", data);
            this.items.push({
              title: searchBy.name + " Movies",
              moviesIdsList: data.results.filter(m => m.adult == false && m.backdrop_path).map(m => m.id),
              collectionType: CollectionType.Movies
            })
          },
          error: (err) => {
            console.log(err);
          }
        })
    }

    seriesSearch(searchBy: IGenre) {
      this._searchService.SearchInSeriesGenre(searchBy.id, false, language.english, 1)
        .subscribe({
          next: (data) => {
            // console.log("searchBy", data);
            this.items.push({
              title: searchBy.name + " Series",
              moviesIdsList: data.results.filter(m => m.adult == false && m.backdrop_path).map(m => m.id),
              collectionType: CollectionType.Series
            })
          },
          error: (err) => {
            console.log(err);
          }
        })
    }
}
