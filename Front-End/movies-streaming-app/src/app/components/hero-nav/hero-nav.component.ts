import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, NgZone, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-hero-nav',
  imports: [CommonModule],
  templateUrl: './hero-nav.component.html'
})
export class HeroNavComponent implements OnInit, OnDestroy{
  constructor(private ngZone: NgZone) {}

  posters : string[] = [
    "images/logos/harry-potter.png",
    "images/logos/breaking-bad.svg",
    "images/logos/star-wars.svg",
    "images/logos/the-grinch.svg",
    "images/logos/game-of-thrones.png"
  ]

  current = 0;
  intervalId: any;
  isMobile = false;

  @Output() sendIndex = new EventEmitter<number>();

  changeIndex(index: number) {
    this.current = index
    this.sendIndex.emit(this.current);
    this.stopPlay()
    this.autoPlay()
  }

  autoPlay() {
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.ngZone.run(() => {
          if (this.current < 4) {
            this.changeIndex(this.current + 1);
          } else {
            this.changeIndex(0);
          }
        });
      }, 20000);
    });
  }

  stopPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnInit(): void {
    this.autoPlay()
  }

  ngOnDestroy(): void {
    this.stopPlay()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; // or any breakpoint you like
  }
}
