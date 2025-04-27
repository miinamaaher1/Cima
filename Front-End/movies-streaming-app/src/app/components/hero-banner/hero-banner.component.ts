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

  @Input() banners : movieBanner[] = []
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
      this.hideVideo()
      this.viewVideo()
    }
  }

  ngOnInit(): void {
    this.checkScreenSize();
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
