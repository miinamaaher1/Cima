import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

export interface movieInfo {
  logo: string,
  promo: string,
  tags: string[],
  link: string,
  button: string,
  discription: string
}

@Component({
  selector: 'app-hero-info',
  imports: [CommonModule],
  templateUrl: './hero-info.component.html'
})
export class HeroInfoComponent implements OnChanges, OnInit {

  @Input() moviesInfo: movieInfo[] = []

  isHovered = false;
  isMobile = false;

  @Input() index = 0;

  triggerHover() {
    this.isHovered = true;
  }

  stopHover() {
    setTimeout(() => {
      this.isHovered = false;
    }, 3000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['index'] && !changes['index'].firstChange) {
      this.triggerHover();
      this.stopHover();
    }
  }

  ngOnInit(): void {
    this.triggerHover();
    this.stopHover();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; // or any breakpoint you like
  }
}
