import { Component } from '@angular/core';
import { IconComponent } from '../icon-component/icon.component';

@Component({
  selector: 'app-movie-card',
  imports: [IconComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  name: string = "Ratatouille";
  hours: number = 1;
  minutes: number = 45;
  posterUrl: string = "https://belovedpawn.org/wp-content/uploads/2024/04/ratatouille-in-hermann-mo.jpeg";
  cast: string[] = ["aaaa", "aaaa"];
}
