import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieCardComponent } from "./components/shared/movie-card/movie-card.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movies-streaming-app';
}
