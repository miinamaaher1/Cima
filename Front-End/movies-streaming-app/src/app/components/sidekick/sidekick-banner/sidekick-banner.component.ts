import { Component, HostListener, Inject, input, OnChanges, OnInit, output, PLATFORM_ID, SimpleChanges} from '@angular/core';
import { movieBanner } from '../../hero/hero-banner/hero-banner.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidekick-banner',
  imports: [CommonModule],
  templateUrl: './sidekick-banner.component.html'
})
export class SidekickBannerComponent implements OnInit, OnChanges {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  banner = input.required<movieBanner>();

  videoVisible = false
  isMuted = true
  isMobile = false;

  videoVisibilityChanged = output<boolean>()

  hideVideo() {
    this.videoVisible = false
    this.videoVisibilityChanged.emit(true)
  }

  viewVideo() {
    setTimeout(() => {
      this.videoVisible = true;
      this.videoVisibilityChanged.emit(false)
    }, 5000);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
    this.hideVideo();
    this.viewVideo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.hideVideo();
    this.viewVideo();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if(window.scrollY == 0) {
      this.viewVideo();
    } else {
      this.hideVideo()
    }
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; // or any breakpoint you like
  }

  playVideo() {
    this.videoVisible = true;
    this.videoVisibilityChanged.emit(false)
  }
}
