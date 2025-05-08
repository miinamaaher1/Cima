import { Component, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { SidekickBannerComponent } from './sidekick-banner/sidekick-banner.component';
import { SidekickInfoComponent } from './sidekick-info/sidekick-info.component';
import { movieBanner } from '../hero/hero-banner/hero-banner.component';
import { movieInfo } from '../hero/hero-info/hero-info.component';
import { SeriesService } from '../../core/services/series/series.service';
import { language } from '../../core/utils/language.enum';
import { ImageService } from '../../core/services/utils/image.service';
import { MovieService } from '../../core/services/movie/movie.service';
import { mediaType } from '../../core/utils/media-type.enum';
import { moviePreview } from '../hero/hero.component';

@Component({
  selector: 'app-sidekick',
  imports: [SidekickBannerComponent, SidekickInfoComponent],
  templateUrl: './sidekick.component.html'
})
export class SidekickComponent implements OnInit, OnChanges {
  constructor(
    private _seriesService : SeriesService,
    private _imageService : ImageService,
    private _movieService : MovieService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchMediaDetails(this.mediaId(), this.mediaType())
    this.banner.set({
      poster : this.preview.poster,
      clip : this.preview.clip
    })
    this.movieInfo.set({
      button : this.preview.button,
      cast : this.preview.cast,
      discription : this.preview.discription,
      promo : this.preview.promo,
      link : this.preview.link,
      logo : this.preview.logo,
      tags : this.preview.tags
    })
  }

  mediaId = input.required<number>()
  mediaType = input.required<mediaType>()

  ngOnInit(): void {
    this.fetchMediaDetails(this.mediaId(), this.mediaType())
    this.banner.set({
      poster : this.preview.poster,
      clip : this.preview.clip
    })
    this.movieInfo.set({
      button : this.preview.button,
      cast : this.preview.cast,
      discription : this.preview.discription,
      promo : this.preview.promo,
      link : this.preview.link,
      logo : this.preview.logo,
      tags : this.preview.tags
    })
  }

  preview : moviePreview = {
    poster: "",
    clip: "",
    logo: "",
    promo: "",
    tags: [],
    cast: [],
    link: "",
    button: "",
    discription: ""
  }

  banner = signal<movieBanner>(
    {
      poster : this.preview.poster,
      clip : this.preview.clip
    }
  )

  movieInfo = signal<movieInfo>(
    {
      button : this.preview.button,
      cast : this.preview.cast,
      discription : this.preview.discription,
      promo : this.preview.promo,
      link : this.preview.link,
      logo : this.preview.logo,
      tags : this.preview.tags
    }
  )

  videoVisibilityChanged = signal<boolean>(false)

  fetchMediaDetails(id : number, type : mediaType) {
    if (type === mediaType.movie) {
      this.preview.link = `movie/${id}`
      this._movieService.getMovieDetails(id, language.english).subscribe({
        next : res => {
          this.preview.discription = res.overview.length > 250
          ? res.overview.slice(0, 247) + '...'
          : res.overview;

          this.preview.tags = res.genres.length > 4
          ? res.genres.map((i) => i.name).slice(0, 4)
          : res.genres.map((i) => i.name);


          this.preview.promo = res.tagline ? res.tagline : "Top movie in Egypt"
          this.preview.button = "Watch Now"
          this.preview.clip = "videos/clips/G_O_T_Clip.mp4"
          this.updateSignals()
        },
        error : err => {
          console.log(err)
        }
      })
      this._movieService.getMovieImages(id).subscribe({
        next : res => {
          this.preview.logo = this._imageService.getImagePath(res.logos[0])
          this.preview.poster = this._imageService.getImagePath(res.backdrops[0])
          this.updateSignals()
        },
        error : err => {
          console.log(err)
        }
      })
      this._movieService.getMovieCredits(id, language.english).subscribe({
        next : res => {
          this.preview.cast = res.cast.length > 10
          ? res.cast.map((i) => i.name).slice(0, 10)
          : res.cast.map((i) => i.name);
          this.updateSignals()
        },
        error : err => {
          console.log(err)
        }
      })
    } else {
      this.preview.link = `series/${id}`
      this._seriesService.getSeriesDetails(id, language.english).subscribe({
        next : res => {
          this.preview.discription = res.overview.length > 250
          ? res.overview.slice(0, 247) + '...'
          : res.overview;

          this.preview.tags = res.genres.length > 4
          ? res.genres.map((i) => i.name).slice(0, 4)
          : res.genres.map((i) => i.name);

          this.preview.link = ""
          this.preview.promo = res.tagline ? res.tagline : "Top series in Egypt"
          this.preview.button = "Watch Now"
          this.preview.clip = "videos/clips/H_P_Clip.mp4"
          this.updateSignals()
        },
        error : err => {
          console.log(err)
        }
      })
      this._seriesService.getSeriesImages(id).subscribe({
        next : res => {
          this.preview.logo = this._imageService.getImagePath(res.logos[0])
          this.preview.poster = this._imageService.getImagePath(res.backdrops[0])
          this.updateSignals()
        },
        error : err => {
          console.log(err)
        }
      })
      this._seriesService.getSeriesCredits(id, language.english).subscribe({
        next : res => {
          this.preview.cast = res.cast.length > 10
          ? res.cast.map((i) => i.name).slice(0, 10)
          : res.cast.map((i) => i.name);
          this.updateSignals()
        },
        error : err => {
          console.log(err)
        }
      })
    }

  }

  updateSignals() {
    this.banner.set({
      poster: this.preview.poster,
      clip: this.preview.clip
    });

    this.movieInfo.set({
      button: this.preview.button,
      cast: this.preview.cast,
      discription: this.preview.discription,
      promo: this.preview.promo,
      link: this.preview.link,
      logo: this.preview.logo,
      tags: this.preview.tags
    });
  }
}
