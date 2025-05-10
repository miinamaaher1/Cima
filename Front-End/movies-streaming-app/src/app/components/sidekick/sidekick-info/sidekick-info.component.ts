import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, input, PLATFORM_ID } from '@angular/core';
import { movieInfo } from '../../hero/hero-info/hero-info.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidekick-info',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidekick-info.component.html'
})
export class SidekickInfoComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  movieInfo = input.required<movieInfo>();
  videoVisibilityChanged = input<boolean>();

  isMobile = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
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
