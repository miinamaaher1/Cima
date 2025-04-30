import { MovieListServiceService } from './../../../core/services/lists/movieList/movie-list-service.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { log } from 'util';

@Component({
  selector: 'app-movie-carousel',
  imports: [MovieCardComponent, CommonModule],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css'
})
export class MovieCarouselComponent {
  @Input() title!: string ;
  @Input() listIds!:number[];
  size: number;
  moviesList: number[]=[];
  currentIndex: number = 0;
  left: number = 0;
  leftHidden: boolean = true;
  rightHidden: boolean = false;
  cardSizeWithGap: number = 268;
  isFirst: boolean = true;
  currentPage:number=1;
  backCounter=0;
  

  constructor() {

   
    
    this.size = Math.ceil(window.innerWidth / this.cardSizeWithGap) + 1;
  
  }

  ngOnInit(): void {

    // console.log(this.listIds);
    // console.log(this.title);
    this.moviesList =this.listIds.slice(0,this.size) ;
    
  }




  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize() {
    window.location.reload();
  }
  goRight(slider: HTMLDivElement) {
    if (this.backCounter==0) {
      this.moviesList.push(...this.listIds.slice(this.moviesList.length,this.size*++this.currentPage))
    }
    else
    this.backCounter--;
  
    console.log(this.moviesList);
    
    this.left -= (this.size / 2) * this.cardSizeWithGap;
    slider.style.left = `${this.left}px`;
    this.leftHidden = (this.left < 0) ? false : true;
  }
  goLeft(slider: HTMLDivElement) {
    this.backCounter++;
    this.left += (this.size / 2) * this.cardSizeWithGap;
    slider.style.left = `${this.left}px`;
    this.leftHidden = (this.left < 0) ? false : true;
  }
}
