import { Component, HostListener, Input, OnChanges, OnInit, output, SimpleChanges, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

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
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @Input() banners : movieBanner[] = []
  @Input() index = 0;
  videoVisibilityChanged = output<boolean>()

  videoVisible = false
  isMuted = true
  isMobile = false;

  hideVideo() {
    this.videoVisible = false
    this.videoVisibilityChanged.emit(true)
  }

  viewVideo() {
    setTimeout(() => {
      this.videoVisible = true;
      this.videoVisibilityChanged.emit(false)
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
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
    this.hideVideo();
    this.viewVideo();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; // or any breakpoint you like
  }
}
