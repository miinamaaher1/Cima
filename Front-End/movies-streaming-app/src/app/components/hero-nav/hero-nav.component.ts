import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, NgZone, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero-nav',
  imports: [CommonModule],
  templateUrl: './hero-nav.component.html'
})
export class HeroNavComponent implements OnInit, OnDestroy{
  constructor(private ngZone: NgZone) {}
  current = 0;
  intervalId: any;

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
}
