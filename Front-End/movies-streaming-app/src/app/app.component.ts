import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WatchAreaComponent } from './components/watch-page/watch-area/watch-area.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WatchAreaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movies-streaming-app';
}
