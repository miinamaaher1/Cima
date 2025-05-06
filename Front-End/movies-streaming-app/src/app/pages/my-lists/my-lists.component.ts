import { Component } from '@angular/core';
import { MovieCardComponent } from "../../components/shared/movie-card/movie-card.component";
import { SerieCardComponent } from "../../components/shared/serie-card/serie-card.component";

@Component({
  selector: 'app-my-lists',
  imports: [MovieCardComponent, SerieCardComponent],
  templateUrl: './my-lists.component.html'
})
export class MyListsComponent {
  watchlistSeriesIds : number[] = [13945, 13945, 13945, 13945, 13945, 13945, 13945]
  watchlistMovieIds : number[] = [1124620, 1124620, 1124620, 1124620, 1124620, 1124620]
  favoriteSeriesIds : number[] = [13945, 13945, 13945, 13945, 13945, 13945, 13945]
  favoriteMovieIds : number[] = [1124620, 1124620, 1124620, 1124620, 1124620, 1124620]
}
