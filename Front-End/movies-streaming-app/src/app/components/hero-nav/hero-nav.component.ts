import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-hero-nav',
  imports: [CommonModule],
  templateUrl: './hero-nav.component.html'
})
export class HeroNavComponent implements OnInit{
  constructor(private ngZone: NgZone) {}
  current = 0;

  @Output() sendIndex = new EventEmitter<number>();

  changeIndex(index: number) {
    this.current = index
    this.sendIndex.emit(this.current);
  }

  autoPlay() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
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

  ngOnInit(): void {
    this.autoPlay()
  }
}
