import { Component, Input } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-carousel',
  imports: [MovieCardComponent, CommonModule],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css'
})
export class MovieCarouselComponent {
  @Input() title: string = "Top Rated";
  @Input() listId: number = 12;
  moviesId: number[] = new Array(10);
  left: number = 0;
  leftHidden: boolean = true;
  rightHidden: boolean = false;
  cardSizeWithGap: number = 276;
  goRight(slider: HTMLDivElement) {
    this.left -= window.innerWidth - 135;
    slider.style.left = `${this.left}px`;
    this.leftHidden = (this.left < 0) ? false : true;
    this.rightHidden = (this.cardSizeWithGap * (slider.childElementCount - 1) > -this.left + window.innerWidth - 400) ? false : true;
  }
  goLeft(slider: HTMLDivElement) {
    this.left += window.innerWidth - 135;
    slider.style.left = `${this.left}px`;
    this.leftHidden = (this.left < 0) ? false : true;
    this.rightHidden = (this.cardSizeWithGap * (slider.childElementCount - 1) > -this.left + window.innerWidth - 400) ? false : true;
  }
}
