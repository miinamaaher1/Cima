import { Component } from '@angular/core';
import { HeroComponent } from "../../components/hero/hero.component";
import { ChartsInfiniteScrollComponent } from "../../components/shared/charts-infinite-scroll/charts-infinite-scroll.component";

@Component({
  selector: 'app-charts',
  imports: [HeroComponent, ChartsInfiniteScrollComponent],
  templateUrl: './charts.component.html'
})
export class ChartsComponent {

}
