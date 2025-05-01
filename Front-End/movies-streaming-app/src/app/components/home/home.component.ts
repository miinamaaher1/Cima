import { Component } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { HomeCarouselsGroupInfiniteComponent } from "../shared/home-carousels-group-infinite/home-carousels-group-infinite.component";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, FooterComponent, HomeCarouselsGroupInfiniteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
