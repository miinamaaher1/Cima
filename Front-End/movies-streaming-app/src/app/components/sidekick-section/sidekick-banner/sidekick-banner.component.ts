import { Component, HostListener, Inject, input, output, PLATFORM_ID} from '@angular/core';
import { movieBanner } from '../../hero-section/hero-banner/hero-banner.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidekick-banner',
  imports: [CommonModule],
  templateUrl: './sidekick-banner.component.html'
})
export class SidekickBannerComponent {
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
    }, 3000);
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
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
