import { CommonModule } from '@angular/common';
import { Component, HostListener, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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
  imports: [CommonModule],
  templateUrl: './hero-info.component.html'
})
export class HeroInfoComponent implements OnInit {

  @Input() moviesInfo: movieInfo[] = []
  videoVisibilityChanged = input<boolean>();

  isMobile = false;

  @Input() index = 0;

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; // or any breakpoint you like
  }
}
