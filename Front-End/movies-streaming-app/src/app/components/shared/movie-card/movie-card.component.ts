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
  videoUrl: string = "https://www.w3schools.com/html/mov_bbb.mp4";
  cast: string[] = ["aaaa", "aaaa"];
  tags: string[] = ["tag 1", "tag 2"];
  timerHandler: any;
  playState: string = "";
  // playVideo(poster: HTMLImageElement, video: HTMLIFrameElement) {
  //   if (!this.timerHandler) {
  //     this.timerHandler = setTimeout(() => {
  //       poster.classList.add("hidden");
  //       video.classList.remove("hidden");
  //     }, 1200);
  //     video.src += "&autoplay=1&mute=1";
  //   }
  // }
  // stopVideo(poster: HTMLImageElement, video: HTMLIFrameElement) {
  //   if (this.timerHandler) {
  //     clearTimeout(this.timerHandler);
  //     this.timerHandler = null;
  //     poster.classList.remove("hidden");
  //     video.classList.add("hidden");
  //     if (video.src.indexOf("&autoplay=1") != -1)
  //       video.src = video.src.substring(0, video.src.indexOf("&autoplay=1"));
  //     else
  //       video.src = video.src;
  //   }
  // }
  playVideo($event: MouseEvent) {
    if (!this.timerHandler) {
      this.timerHandler = setTimeout(() => {
        ($event.target as HTMLVideoElement).muted = true;
        ($event.target as HTMLVideoElement).loop = true;
        ($event.target as HTMLVideoElement).play();
      }, 1000);
    }
  }
  stopVideo($event: MouseEvent) {
    if (this.timerHandler) {
      clearTimeout(this.timerHandler);
      this.timerHandler = null;
      ($event.target as HTMLVideoElement).load();
    }
  }
}
