import { SearchService } from './../../../core/services/search/search.service';
import { GenresService } from './../../../core/services/genres/genres.service';
import { ICarouselData } from './../../../core/interfaces/icarousel-data';
import { Component } from '@angular/core';
import { MovieCarouselComponent } from "../movie-carousel/movie-carousel.component";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MovieListServiceService } from '../../../core/services/lists/movieList/movie-list-service.service';
import { language } from '../../../core/utils/language.enum';
import { SeriesListServiceService } from '../../../core/services/lists/seriesList/series-list-service.service';
import { IGenreList } from '../../../core/interfaces/IGenre';
import { IGenre } from '../../../core/interfaces/IMovieDetails';
import { IMovieList } from '../../../core/interfaces/IMovieList';

@Component({
  selector: 'app-home-carousels-group-infinite',
  imports: [MovieCarouselComponent,InfiniteScrollDirective],
  templateUrl: './home-carousels-group-infinite.component.html',
  styleUrl: './home-carousels-group-infinite.component.css'
})

export class HomeCarouselsGroupInfiniteComponent {
  items:ICarouselData[]=[];
 moviesList: number[]=[];
 MoviesGenresList:IGenre[]=[];
 SeriesGenresList:IGenre[]=[];


currentMoviesGenresIndex=0;
currentSeriesGenresIndex= 0;

constructor(private _movieListService:MovieListServiceService,
  private _seriesListServiceService:SeriesListServiceService,
  private _searchService:SearchService,
  private _genresService:GenresService,
){
  

}

ngOnInit(): void {

this._genresService.getAllMovieGenres(language.english).subscribe
({
  next:(data)=>{
    console.log(data);
    this.MoviesGenresList.push(...data.genres)
    
  },
  error:(err)=>{
    console.log(err);
  }
});

this._genresService.getAllSeriesGenres(language.english).subscribe
({
  next:(data)=>{
    console.log(data);
    this.SeriesGenresList.push(...data.genres)
    
  },
  error:(err)=>{
    console.log(err);
  }
});
  
  this._movieListService.getPopularMovies(1,language.english).subscribe(
    {
      next:(data)=>{
        console.log(data);
        this.items.push({
          title:"Popular Movies",
          moviesIdsList:data.results.filter(m=>m.adult==false).map(m=>m.id)
        })
      },
      error:(err)=>{
        console.log(err);
        
      }
    } 
  );

  this._movieListService.getTopRatedMovies(1,language.english).subscribe(
    {
      next:(data)=>{
        console.log(data);
        this.items.push({
          title:"Top Rated Movies",
          moviesIdsList:data.results.filter(m=>m.adult==false).map(m=>m.id)
        })
      },
      error:(err)=>{
        console.log(err);
        
      }
    } 
  );

  this._movieListService.getNowplayingMovies(1,language.english).subscribe(
    {
      next:(data)=>{
        console.log(data);
        this.items.push({
          title:"Now Playing Movies",
          moviesIdsList:data.results.filter(m=>m.adult==false).map(m=>m.id)
        })
      },
      error:(err)=>{
        console.log(err);
        
      }
    } 
  );
  this._seriesListServiceService.getPopularTvSeries(1,language.english).subscribe(
    {
      next:(data)=>{
        console.log(data);
        this.items.push({
          title:"Popular Tv Series",
          moviesIdsList:data.results.filter(m=>m.adult==false).map(m=>m.id)
        })
      },
      error:(err)=>{
        console.log(err);
        
      }
    } 
  );
   this._seriesListServiceService.getTopRatedTvSeries(1,language.english).subscribe(
    {
      next:(data)=>{
        console.log(data);
        this.items.push({
          title:"Top Rated Tv Series",
          moviesIdsList:data.results.filter(m=>m.adult==false).map(m=>m.id)
        })
      },
      error:(err)=>{
        console.log(err);
        
      }
    } 
  );
}

loadMoreItems() {

  if(this.currentMoviesGenresIndex<this.MoviesGenresList.length)
 {
  this.moviesSearch(this.MoviesGenresList[this.currentMoviesGenresIndex].name);
  this.currentMoviesGenresIndex++;
 }
  if(this.currentSeriesGenresIndex<=this.SeriesGenresList.length)
  {
    this.seriesSearch(this.SeriesGenresList[this.currentSeriesGenresIndex].name);

   
    this.currentSeriesGenresIndex++;
  }
  
  console.log("allllllll items",this.items);

}

moviesSearch(searchBy:string){
  this._searchService.SearchInMovies(searchBy,false,language.english,1)
  .subscribe({
    next:(data)=>{

      console.log("searchBy",data);
      this.items.push({
        title:searchBy+" Movies",
        moviesIdsList:data.results.filter(m=>m.adult==false).map(m=>m.id)
      })
    
    }
    ,
    error:(err)=>{
      console.log(err);
    }
  })
}

seriesSearch(searchBy:string){
  this._searchService.SearchInSeries(searchBy,false,language.english,1)
  .subscribe({
    next:(data)=>{

      console.log("searchBy",data);
      this.items.push({
        title:searchBy+" Series",
        moviesIdsList:data.results.filter(m=>m.adult==false).map(m=>m.id)
      })
    
    }
    ,
    error:(err)=>{
      console.log(err);
    }
  })
}

}
