import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, input, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface movieInfo {
  logo: string,
  promo: string,
  tags: string[],
  cast: string[],
  link: string,
  button: string,
  discription: string
}

@Component({
  selector: 'app-hero-info',
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-info.component.html'
})
export class HeroInfoComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @Input() moviesInfo: movieInfo[] = []
  videoVisibilityChanged = input<boolean>();

  isMobile = false;

  @Input() index = 0;

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
