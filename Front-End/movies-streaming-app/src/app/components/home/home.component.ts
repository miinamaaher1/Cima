import { Component } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { MovieCarouselComponent } from '../shared/movie-carousel/movie-carousel.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, MovieCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
