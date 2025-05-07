import { Component } from '@angular/core';
import { HomeCarouselsGroupInfiniteComponent } from "../../components/shared/home-carousels-group-infinite/home-carousels-group-infinite.component";
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, HomeCarouselsGroupInfiniteComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
