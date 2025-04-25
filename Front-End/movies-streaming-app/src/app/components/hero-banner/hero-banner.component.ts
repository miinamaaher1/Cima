import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface movieBanner {
  poster: string;
  clip: string;
}

@Component({
  selector: 'app-hero-banner',
  imports: [CommonModule],
  templateUrl: './hero-banner.component.html'
})
export class HeroBannerComponent implements OnChanges, OnInit {
  constructor(private sanitizer: DomSanitizer) {}

  banners : movieBanner[] = [
    {
      poster: "images/posters/harry.jpg",
      clip: "cGtI2MuCfTw"
    },
    {
      poster: "images/posters/breaking.jpg",
      clip: "niqpoGcot4I"
    },
    {
      poster: "images/posters/star.jpg",
      clip: "znVxyZ85X7I"
    },
    {
      poster: "images/posters/grinch.jpg",
      clip: "duHY8QrrYdE"
    },
    {
      poster: "images/posters/thrones.jpg",
      clip: "Zb8YKIb37wA"
    }
  ]

  current : movieBanner = {
    poster: "images/posters/harry.jpg",
    clip: "cGtI2MuCfTw"
  }

  safeVideoUrl: SafeResourceUrl = '';

  @Input() index = 0;

  videoVisible = false

  hideVideo() {
    this.videoVisible = false
  }

  viewVideo() {
    setTimeout(() => {
      this.videoVisible = true;
    }, 2500);
  }

  getSafeUrl(key: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${key}&modestbranding=1&rel=0&showinfo=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['index'] && !changes['index'].firstChange) {
      this.current.poster = this.banners[this.index].poster;
      this.current.clip = this.banners[this.index].clip;
      this.safeVideoUrl = this.getSafeUrl(this.current.clip);
      this.hideVideo()
      this.viewVideo()
    }
  }

  ngOnInit(): void {
    this.safeVideoUrl = this.getSafeUrl(this.current.clip);
    this.hideVideo();
    this.viewVideo();
  }
}
