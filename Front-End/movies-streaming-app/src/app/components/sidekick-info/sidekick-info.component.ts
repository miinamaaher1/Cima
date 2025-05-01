import { CommonModule } from '@angular/common';
import { Component, HostListener, input } from '@angular/core';
import { movieInfo } from '../hero-info/hero-info.component';

@Component({
  selector: 'app-sidekick-info',
  imports: [CommonModule],
  templateUrl: './sidekick-info.component.html'
})
export class SidekickInfoComponent {

  movieInfo = input.required<movieInfo>();
  videoVisibilityChanged = input<boolean>();

  isMobile = false;

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
