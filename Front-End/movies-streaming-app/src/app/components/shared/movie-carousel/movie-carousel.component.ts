import { Component, HostListener, Input, OnInit } from '@angular/core';
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
  size: number;
  moviesList: number[];
  currentIndex: number = 0;
  left: number = 0;
  leftHidden: boolean = true;
  rightHidden: boolean = false;
  cardSizeWithGap: number = 268;
  isFirst: boolean = true;
  constructor() {
    this.size = Math.floor(window.innerWidth / this.cardSizeWithGap);
    this.moviesList = new Array(this.size);
  }
  
  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize() {
    window.location.reload();
  }
  goRight(slider: HTMLDivElement) {
    for (let i = 0; i < this.size; i++) this.moviesList.push(1);
    this.left -= this.size * this.cardSizeWithGap;
    slider.style.left = `${this.left}px`;
    this.leftHidden = (this.left < 0) ? false : true;
  }
  goLeft(slider: HTMLDivElement) {
    this.left += this.size * this.cardSizeWithGap;
    slider.style.left = `${this.left}px`;
    this.leftHidden = (this.left < 0) ? false : true;
  }
}
