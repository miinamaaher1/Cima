import { Component } from '@angular/core';
import { MovieCarouselComponent } from "../movie-carousel/movie-carousel.component";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-home-carousels-group-infinite',
  imports: [MovieCarouselComponent,InfiniteScrollDirective],
  templateUrl: './home-carousels-group-infinite.component.html',
  styleUrl: './home-carousels-group-infinite.component.css'
})
export class HomeCarouselsGroupInfiniteComponent {
  items= new Array(5);
loadMoreItems() {
  this.items.push(...[1,2,3,4,5])
}

}
