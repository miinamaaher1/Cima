import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
      // clip: "VyHV0BRtdxo"
      clip: "videos/clips/H_P_Clip.mp4"
    },
    {
      poster: "images/posters/breaking.jpg",
      // clip: "VFkjBy2b50Q"
      clip: "videos/clips/B_B_Clip.mp4"
    },
    {
      poster: "images/posters/star.jpg",
      // clip: "Q0CbN8sfihY"
      clip: "videos/clips/S_W_Clip.mp4"
    },
    {
      poster: "images/posters/grinch.jpg",
      // clip: "TdSdIjb8N9M"
      clip: "videos/clips/H_G_S_C_Clip.mp4"
    },
    {
      poster: "images/posters/thrones.jpg",
      // clip: "KPLWWIOCOOQ"
      clip: "videos/clips/G_O_T_Clip.mp4"
    }
  ]

  current : movieBanner = this.banners[0];

  safeVideoUrl: SafeResourceUrl = '';

  @Input() index = 0;

  videoVisible = false
  isMuted = true

  hideVideo() {
    this.videoVisible = false
  }

  viewVideo() {
    setTimeout(() => {
      this.videoVisible = true;
    }, 3000);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
  }

  getSafeUrl(key: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${key}&modestbranding=1&rel=0&showinfo=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['index'] && !changes['index'].firstChange) {
      this.current = this.banners[this.index];
      // this.safeVideoUrl = this.getSafeUrl(this.current.clip);
      this.hideVideo()
      this.viewVideo()
    }
  }

  ngOnInit(): void {
    // this.safeVideoUrl = this.getSafeUrl(this.current.clip);
    this.hideVideo();
    this.viewVideo();
  }
}
