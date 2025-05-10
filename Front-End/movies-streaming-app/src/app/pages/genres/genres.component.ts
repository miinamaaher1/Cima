import { Component } from '@angular/core';
import { HeroComponent } from "../../components/hero/hero.component";
import { GenresInfiniteScrollComponent } from "../../components/shared/genres-infinite-scroll/genres-infinite-scroll.component";

@Component({
  selector: 'app-genres',
  imports: [HeroComponent, GenresInfiniteScrollComponent],
  templateUrl: './genres.component.html'
})
export class GenresComponent {

}
