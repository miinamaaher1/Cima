import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon-component/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  imports: [IconComponent, CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() id: number = 0;
  name: string = "Ratatouille";
  hours: number = 1;
  minutes: number = 45;
  posterUrl: string = "https://belovedpawn.org/wp-content/uploads/2024/04/ratatouille-in-hermann-mo.jpeg";
  cast: string[] = ["aaaa", "aaaa"];
  tags: string[] = ["tag 1", "tag 2"];
  intervalHandler: any;
  playVideo(poster: HTMLImageElement, video: HTMLIFrameElement) {
    if (!this.intervalHandler) {
      this.intervalHandler = setTimeout(() => {
        poster.classList.add("hidden");
        video.classList.remove("hidden");
      }, 1200);
      video.src += "&autoplay=1&mute=1";
    }
  }
  stopVideo(poster: HTMLImageElement, video: HTMLIFrameElement) {
    if (this.intervalHandler) {
      clearTimeout(this.intervalHandler);
      this.intervalHandler = null;
      poster.classList.remove("hidden");
      video.classList.add("hidden");
      if (video.src.indexOf("&autoplay=1") != -1)
        video.src = video.src.substring(0, video.src.indexOf("&autoplay=1"));
      else
        video.src = video.src;
    }
  }
}
