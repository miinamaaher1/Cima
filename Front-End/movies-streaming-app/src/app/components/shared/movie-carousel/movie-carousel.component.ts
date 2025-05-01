import { Component, HostListener, Inject, Input } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { CollectionType } from '../../../core/utils/collection-type';
import { SerieCardComponent } from '../serie-card/serie-card.component';
import { WINDOW } from '../../../core/tokens/window.token';

@Component({
  selector: 'app-movie-carousel',
  imports: [MovieCardComponent, CommonModule, SerieCardComponent],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css'
})
export class MovieCarouselComponent {
  @Input() title!: string;
  @Input() listIds!: number[];
  @Input() collectionType: CollectionType = CollectionType.Movies;
  size: number = 0;
  step: number = 0;
  collectionList: number[] = [];
  currentIndex: number = 0;
  left: number = 0;
  leftHidden: boolean = true;
  rightHidden: boolean = false;
  cardSizeWithGap: number = 268;
  isFirst: boolean = true;
  currentPage: number = 1;
  backCounter: number = 0;
  get CollectionType() { return CollectionType; }
  constructor(@Inject(WINDOW) private window: Window) { }
  ngOnInit(): void {
    this.size = Math.ceil(this.window.innerWidth / this.cardSizeWithGap) + 1;
    this.collectionList = this.listIds.slice(0, this.size);
    if (this.size > 2)
      this.step = (this.size / 2) * this.cardSizeWithGap;
    else
      this.step = this.cardSizeWithGap / 4;
  }
  // @HostListener('window:resize', ['$event.target.innerWidth'])
  // onResize() {
  //   window.location.reload();
  // }
  goRight(slider: HTMLDivElement) {
    if (this.backCounter == 0)
      this.collectionList.push(...this.listIds.slice(this.collectionList.length, this.size * ++this.currentPage))
    else
      this.backCounter--;
    this.left -= this.step;
    slider.style.left = `${this.left}px`;
    this.leftHidden = (this.left < 0) ? false : true;
    this.rightHidden = (this.step - this.left < this.cardSizeWithGap * (this.listIds.length - ((this.size) > 2 ? 1 : 2))) ? false : true;
  }
  goLeft(slider: HTMLDivElement) {
    this.backCounter++;
    this.left += this.step;
    slider.style.left = `${this.left}px`;
    this.leftHidden = (this.left < 0) ? false : true;
    this.rightHidden = (this.step - this.left < this.cardSizeWithGap * (this.listIds.length - ((this.size) > 2 ? 1 : 2))) ? false : true;
  }
}
