import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav-section/nav/nav.component";
import { FooterComponent } from "./components/shared/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'movies-streaming-app';
}
