import { Component, signal } from '@angular/core';
import { HeroBannerComponent, movieBanner } from "../hero-banner/hero-banner.component";
import { HeroInfoComponent, movieInfo } from "../hero-info/hero-info.component";
import { HeroNavComponent } from "../hero-nav/hero-nav.component";

export interface moviePreview {
  poster: string,
  clip: string,
  logo: string,
  promo: string,
  tags: string[],
  cast: string[],
  link: string,
  button: string,
  discription: string
}

@Component({
  selector: 'app-hero',
  imports: [HeroBannerComponent, HeroInfoComponent, HeroNavComponent],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  movieIndex = 0;

  previews : moviePreview[] = [
    {
      poster: "images/posters/harry.jpg",
      clip: "videos/clips/H_P_Clip.mp4",
      logo: "images/logos/harry-potter.png",
      promo: "Top 10 In Egypt",
      tags: ["1:58:42", "Top 10", "Adventure", "Fantasy"],
      cast: ["John Doe", "Ana De Armas", "Mina Maher", "Holly Wood", "Jack Black", "Mai Ez El-Dein"],
      link: "",
      button: "Watch Now",
      discription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nostrum odio a nam facilis quasi nulla ipsam at itaque necessitatibus tempora dignissimos ut consequuntur rem, esse iusto ab dolor voluptatem."
    },
    {
      poster: "images/posters/breaking.jpg",
      clip: "videos/clips/B_B_Clip.mp4",
      logo: "images/logos/breaking-bad.svg",
      promo: "Now For Free",
      tags: ["Season 2", "Top 10", "Action", "Drama"],
      cast: ["John Doe", "Ana De Armas", "Mina Maher", "Holly Wood", "Jack Black", "Mai Ez El-Dein"],
      link: "",
      button: "Watch Now",
      discription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nostrum odio a nam facilis quasi nulla ipsam at itaque necessitatibus tempora dignissimos ut consequuntur rem, esse iusto ab dolor voluptatem."
    },
    {
      poster: "images/posters/star.jpg",
      clip: "videos/clips/S_W_Clip.mp4",
      logo: "images/logos/star-wars.svg",
      promo: "Subscribe To Watch",
      tags: ["2:03:15", "Top 10", "Adventure", "Sci-Fi"],
      cast: ["John Doe", "Ana De Armas", "Mina Maher", "Holly Wood", "Jack Black", "Mai Ez El-Dein"],
      link: "",
      button: "Watch Now",
      discription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nostrum odio a nam facilis quasi nulla ipsam at itaque necessitatibus tempora dignissimos ut consequuntur rem, esse iusto ab dolor voluptatem."
    },
    {
      poster: "images/posters/grinch.jpg",
      clip: "videos/clips/H_G_S_C_Clip.mp4",
      logo: "images/logos/the-grinch.svg",
      promo: "The Cringe Wining Film",
      tags: ["Cringe", "Movie", "Comedy"],
      cast: ["John Doe", "Ana De Armas", "Mina Maher", "Holly Wood", "Jack Black", "Mai Ez El-Dein"],
      link: "",
      button: "Watch Now",
      discription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nostrum odio a nam facilis quasi nulla ipsam at itaque necessitatibus tempora dignissimos ut consequuntur rem, esse iusto ab dolor voluptatem."
    },
    {
      poster: "images/posters/thrones.jpg",
      clip: "videos/clips/G_O_T_Clip.mp4",
      logo: "images/logos/game-of-thrones.png",
      promo: "The Award Wining Show",
      tags: ["Season 4", "Top 10", "Adventure", "Fantasy"],
      cast: ["John Doe", "Ana De Armas", "Mina Maher", "Holly Wood", "Jack Black", "Mai Ez El-Dein"],
      link: "",
      button: "Watch Now",
      discription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nostrum odio a nam facilis quasi nulla ipsam at itaque necessitatibus tempora dignissimos ut consequuntur rem, esse iusto ab dolor voluptatem."
    }
  ]

  banners : movieBanner[] = this.previews.map((i) => ({
    poster : i.poster,
    clip : i.clip
  }))

  moviesInfo : movieInfo[] = this.previews.map((i) => ({
    logo: i.logo,
    promo: i.promo,
    tags: i.tags,
    cast: i.cast,
    link: i.link,
    button: i.button,
    discription: i.discription
  }))

  logos : string[] = this.previews.map((i) => ( i.logo))

  changeMovie(index : number) {
    this.movieIndex = index;
  }

  videoVisibilityChanged = signal<boolean>(false)
}
