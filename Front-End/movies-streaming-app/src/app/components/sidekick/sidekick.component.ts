import { Component, signal } from '@angular/core';
import { SidekickBannerComponent } from '../sidekick-banner/sidekick-banner.component';
import { SidekickInfoComponent } from '../sidekick-info/sidekick-info.component';
import { moviePreview } from '../hero/hero.component';
import { movieBanner } from '../hero-banner/hero-banner.component';
import { movieInfo } from '../hero-info/hero-info.component';

@Component({
  selector: 'app-sidekick',
  imports: [SidekickBannerComponent, SidekickInfoComponent],
  templateUrl: './sidekick.component.html'
})
export class SidekickComponent {
  preview : moviePreview = {
    poster: "images/posters/harry.jpg",
    clip: "videos/clips/H_P_Clip.mp4",
    logo: "images/logos/harry-potter.png",
    promo: "Top 10 In Egypt",
    tags: ["1:58:42", "Top 10", "Adventure", "Fantasy"],
    cast: ["John Doe", "Ana De Armas", "Mina Maher", "Holly Wood", "Jack Black", "Mai Ez El-Dein"],
    link: "",
    button: "Watch Now",
    discription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nostrum odio a nam facilis quasi nulla ipsam at itaque necessitatibus tempora dignissimos ut consequuntur rem, esse iusto ab dolor voluptatem."
  }

  banner : movieBanner = {
    poster : this.preview.poster,
    clip : this.preview.clip
  }

  movieInfo : movieInfo = {
    logo: this.preview.logo,
    promo: this.preview.promo,
    tags: this.preview.tags,
    cast: this.preview.cast,
    link: this.preview.link,
    button: this.preview.button,
    discription: this.preview.discription
  }

  videoVisibilityChanged = signal<boolean>(false)
}
