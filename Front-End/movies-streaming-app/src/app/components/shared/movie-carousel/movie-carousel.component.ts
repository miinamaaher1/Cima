import { Component, Input, OnInit } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-carousel',
  imports: [MovieCardComponent, CommonModule],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css'
})
export class MovieCarouselComponent implements OnInit {
  @Input() title: string = "Top Rated";
  @Input() listId: number = 12;
  moviesList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  newList: number[][] = [];
  currentIndex: number = 0;
  size: number = 5;
  left: number = 0;
  leftHidden: boolean = true;
  rightHidden: boolean = false;
  cardSizeWithGap: number = 276;
  ngOnInit(): void {
    for (let i = 0; i < this.moviesList.length; i += this.size) {
      this.newList.push(this.moviesList.slice(i, i + this.size));
    }
    console.log(this.newList[this.currentIndex]);
  }
  goRight(slider: HTMLDivElement) {
    this.currentIndex++;
    if (this.currentIndex === this.newList.length) this.currentIndex = this.newList.length - 1;
    this.left -= window.innerWidth - 135;
    slider.style.left = `${this.left}px`;
    this.leftHidden = (this.left < 0) ? false : true;
    this.rightHidden = (this.cardSizeWithGap * (this.moviesList.length - 1) > -this.left + window.innerWidth - 400) ? false : true;
  }
  goLeft(slider: HTMLDivElement) {
    this.currentIndex--;
    if (this.currentIndex < 0) this.currentIndex = 0;
    this.left += window.innerWidth - 135;
    slider.style.left = `${this.left}px`;
    this.leftHidden = (this.left < 0) ? false : true;
    this.rightHidden = (this.cardSizeWithGap * (this.moviesList.length - 1) > -this.left + window.innerWidth - 400) ? false : true;
  }
}
