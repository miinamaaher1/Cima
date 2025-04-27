import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface movieBanner {
  poster: string;
  clip: string;
}

@Component({
  selector: 'app-hero-banner',
  imports: [CommonModule],
  templateUrl: './hero-banner.component.html'
})
export class HeroBannerComponent implements OnChanges, OnInit {

  banners : movieBanner[] = [
    {
      poster: "images/posters/harry.jpg",
      clip: "videos/clips/H_P_Clip.mp4"
    },
    {
      poster: "images/posters/breaking.jpg",
      clip: "videos/clips/B_B_Clip.mp4"
    },
    {
      poster: "images/posters/star.jpg",
      clip: "videos/clips/S_W_Clip.mp4"
    },
    {
      poster: "images/posters/grinch.jpg",
      clip: "videos/clips/H_G_S_C_Clip.mp4"
    },
    {
      poster: "images/posters/thrones.jpg",
      clip: "videos/clips/G_O_T_Clip.mp4"
    }
  ]

  current : movieBanner = this.banners[0];


  @Input() index = 0;

  videoVisible = false
  isMuted = true
  isMobile = false;

  hideVideo() {
    this.videoVisible = false
  }

  viewVideo() {
    setTimeout(() => {
      this.videoVisible = true;
    }, 3000);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['index'] && !changes['index'].firstChange) {
      this.current = this.banners[this.index];
      this.hideVideo()
      this.viewVideo()
    }
  }

  ngOnInit(): void {
    this.hideVideo();
    this.viewVideo();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; // or any breakpoint you like
  }
}
