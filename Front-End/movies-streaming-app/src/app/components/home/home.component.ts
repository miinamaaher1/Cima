import { Component } from '@angular/core';
import { HeroComponent } from "../hero-section/hero/hero.component";
import { HomeCarouselsGroupInfiniteComponent } from "../shared/home-carousels-group-infinite/home-carousels-group-infinite.component";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, HomeCarouselsGroupInfiniteComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
