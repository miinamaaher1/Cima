import { Component } from '@angular/core';
import { HeroBannerComponent } from "../hero-banner/hero-banner.component";
import { HeroInfoComponent } from "../hero-info/hero-info.component";
import { HeroNavComponent } from "../hero-nav/hero-nav.component";

@Component({
  selector: 'app-hero',
  imports: [HeroBannerComponent, HeroInfoComponent, HeroNavComponent],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  movieIndex = 0;

  changeMovie(index : number) {
    this.movieIndex = index;
  }
}
