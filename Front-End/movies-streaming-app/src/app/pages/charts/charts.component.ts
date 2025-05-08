import { Component } from '@angular/core';
import { HeroComponent } from "../../components/hero/hero.component";
import { HomeCarouselsGroupInfiniteComponent } from "../../components/shared/home-carousels-group-infinite/home-carousels-group-infinite.component";

@Component({
  selector: 'app-charts',
  imports: [HeroComponent, HomeCarouselsGroupInfiniteComponent],
  templateUrl: './charts.component.html'
})
export class ChartsComponent {

}
