import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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

  moviesInfo: movieInfo[] = [
    {
      logo: "images/logos/harry-potter.png",
      promo: "Top 10 In Egypt",
      tags: ["1:58:42", "Top 10", "Adventure", "Fantasy"],
      link: "",
      button: "Watch Now",
      discription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nostrum odio a nam facilis quasi nulla ipsam at itaque necessitatibus tempora dignissimos ut consequuntur rem, esse iusto ab dolor voluptatem."
    },
    {
      logo: "images/logos/breaking-bad.svg",
      promo: "Now For Free",
      tags: ["Season 2", "Top 10", "Action", "Drama"],
      link: "",
      button: "Watch Now",
      discription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nostrum odio a nam facilis quasi nulla ipsam at itaque necessitatibus tempora dignissimos ut consequuntur rem, esse iusto ab dolor voluptatem."
    },
    {
      logo: "images/logos/star-wars.svg",
      promo: "Subscribe To Watch",
      tags: ["2:03:15", "Top 10", "Adventure", "Sci-Fi"],
      link: "",
      button: "Watch Now",
      discription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nostrum odio a nam facilis quasi nulla ipsam at itaque necessitatibus tempora dignissimos ut consequuntur rem, esse iusto ab dolor voluptatem."
    },
    {
      logo: "images/logos/the-grinch.svg",
      promo: "The Cringe Wining Film",
      tags: ["Cringe", "Movie", "Comedy"],
      link: "",
      button: "Watch Now",
      discription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nostrum odio a nam facilis quasi nulla ipsam at itaque necessitatibus tempora dignissimos ut consequuntur rem, esse iusto ab dolor voluptatem."
    },
    {
      logo: "images/logos/game-of-thrones.png",
      promo: "The Award Wining Show",
      tags: ["Season 4", "Top 10", "Adventure", "Fantasy"],
      link: "",
      button: "Watch Now",
      discription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nostrum odio a nam facilis quasi nulla ipsam at itaque necessitatibus tempora dignissimos ut consequuntur rem, esse iusto ab dolor voluptatem."
    }
  ]

  currentInfo : movieInfo = {
    logo: "images/logos/harry-potter.png",
    promo: "Top 10 In Egypt",
    tags: ["1:58:42", "Top 10", "Adventure", "Fantasy"],
    link: "",
    button: "Watch Now",
    discription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nostrum odio a nam facilis quasi nulla ipsam at itaque necessitatibus tempora dignissimos ut consequuntur rem, esse iusto ab dolor voluptatem."
  }

  isHovered = false;

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
      this.currentInfo = this.moviesInfo[this.index]
      this.triggerHover();
      this.stopHover();
    }
  }

  ngOnInit(): void {
    this.triggerHover();
    this.stopHover();
  }
}
