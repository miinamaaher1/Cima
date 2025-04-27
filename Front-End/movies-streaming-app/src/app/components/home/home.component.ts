import { Component } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
