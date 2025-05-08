import { Component, OnInit, signal } from '@angular/core';
import { HeroBannerComponent, movieBanner } from "./hero-banner/hero-banner.component";
import { HeroInfoComponent, movieInfo } from "./hero-info/hero-info.component";
import { HeroNavComponent } from "./hero-nav/hero-nav.component";
import { forkJoin } from 'rxjs';
import { SeriesService } from '../../core/services/series/series.service';
import { ImageService } from '../../core/services/utils/image.service';
import { MovieService } from '../../core/services/movie/movie.service';
import { MovieListServiceService } from '../../core/services/lists/movieList/movie-list-service.service';
import { SeriesListServiceService } from '../../core/services/lists/seriesList/series-list-service.service';
import { language } from '../../core/utils/language.enum';
import { RouterLink } from '@angular/router';

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
  imports: [HeroBannerComponent, HeroInfoComponent, HeroNavComponent, RouterLink],
  templateUrl: './hero.component.html'
})
export class HeroComponent implements OnInit {
  constructor(
    private _seriesService: SeriesService,
    private _imageService: ImageService,
    private _movieService: MovieService,
    private _movieListService: MovieListServiceService,
    private _seriesListService: SeriesListServiceService
  ) { }

  ngOnInit(): void {
    this.fetchPromotedMedia()
  }

  movieIndex = signal(0);

  previews: moviePreview[] = [
    {
      poster: "",
      clip: "videos/clips/G_O_T_Clip.mp4",
      logo: "",
      promo: "Top 10 In Egypt",
      tags: [],
      cast: [],
      link: "",
      button: "Watch Now",
      discription: ""
    },
    {
      poster: "",
      clip: "videos/clips/B_B_Clip.mp4",
      logo: "",
      promo: "Now For Free",
      tags: [],
      cast: [],
      link: "",
      button: "Watch Now",
      discription: ""
    },
    {
      poster: "",
      clip: "videos/clips/S_W_Clip.mp4",
      logo: "",
      promo: "Subscribe To Watch",
      tags: [],
      cast: [],
      link: "",
      button: "Watch Now",
      discription: ""
    },
    {
      poster: "",
      clip: "videos/clips/H_G_S_C_Clip.mp4",
      logo: "",
      promo: "The Cringe Wining Film",
      tags: [],
      cast: [],
      link: "",
      button: "Watch Now",
      discription: ""
    },
    {
      poster: "",
      clip: "videos/clips/H_P_Clip.mp4",
      logo: "",
      promo: "The Award Wining Show",
      tags: [],
      cast: [],
      link: "",
      button: "Watch Now",
      discription: ""
    }
  ]

  banners = signal<movieBanner[]>(this.previews.map((i) => ({
    poster: i.poster,
    clip: i.clip
  })))

  moviesInfo = signal<movieInfo[]>(this.previews.map((i) => ({
    logo: i.logo,
    promo: i.promo,
    tags: i.tags,
    cast: i.cast,
    link: i.link,
    button: i.button,
    discription: i.discription
  })))

  logos = signal<string[]>(this.previews.map((i) => (i.logo)))

  movieIds: number[] = []
  seriesIds: number[] = []

  changeMovie(index: number) {
    this.movieIndex.set(index);
  }

  videoVisibilityChanged = signal<boolean>(false)

  fetchPromotedMedia() {
    forkJoin({
      movies: this._movieListService.getTopRatedMovies(1, language.english),
      series: this._seriesListService.getTopRatedTvSeries(1, language.english)
    }).subscribe({
      next: ({ movies, series }) => {
        this.movieIds = movies.results.map(i => i.id).slice(0, 10);
        this.seriesIds = series.results.map(i => i.id).slice(0, 10);

        this.loadPreviews(); // only start loading previews after IDs are ready
      },
      error: err => console.log(err)
    });
  }

  loadPreviews() {
    let mov = 0;
    let movs : number[] = [];
    let ser = 0;
    let sers : number[] = [];

    for (let i = 0; i < 5; i++) {
      if (i % 2 === 0 && this.movieIds[mov] != null) {

        do {
          mov = Math.floor(Math.random() * 10);
        } while (movs.includes(mov));
        movs.push(mov);

        this.previews[i].link = `movie/${this.movieIds[mov]}`
        this._movieService.getMovieDetails(this.movieIds[mov], language.english).subscribe({
          next: res => {
            this.previews[i].discription = res.overview.length > 150
              ? res.overview.slice(0, 147) + '...'
              : res.overview;
            this.previews[i].tags = res.genres.map(i => i.name).slice(0, 4);
            this.previews[i].promo = res.tagline ? res.tagline : this.previews[i].promo
            this.updateSignals();
          },
          error: err => console.log(err)
        });

        this._movieService.getMovieImages(this.movieIds[mov]).subscribe({
          next: res => {
            this.previews[i].logo = this._imageService.getImagePath(res.logos[0]);
            this.previews[i].poster = this._imageService.getImagePath(res.backdrops[0]);
            this.updateSignals();
          },
          error: err => console.log(err)
        });

        // mov++;
      } else if (this.seriesIds[ser] != null) {

        do {
          ser = Math.floor(Math.random() * 10);
        } while (sers.includes(ser));
        sers.push(ser);

        this.previews[i].link = `series/${this.seriesIds[ser]}`
        this._seriesService.getSeriesDetails(this.seriesIds[ser], language.english).subscribe({
          next: res => {
            this.previews[i].discription = res.overview.length > 150
              ? res.overview.slice(0, 147) + '...'
              : res.overview;
            this.previews[i].tags = res.genres.map(i => i.name).slice(0, 4);
            this.previews[i].promo = res.tagline ? res.tagline : this.previews[i].promo
            this.updateSignals();
          },
          error: err => console.log(err)
        });

        this._seriesService.getSeriesImages(this.seriesIds[ser]).subscribe({
          next: res => {
            this.previews[i].logo = this._imageService.getImagePath(res.logos[0]);
            this.previews[i].poster = this._imageService.getImagePath(res.backdrops[0]);
            this.updateSignals();
          },
          error: err => console.log(err)
        });

        // ser++;
      }
    }
  }

  updateSignals() {
    this.banners.set(
      this.previews.map((i) => ({
        poster: i.poster,
        clip: i.clip
      }))
    )
    this.moviesInfo.set(
      this.previews.map((i) => ({
        button: i.button,
        cast: i.cast,
        discription: i.discription,
        promo: i.promo,
        link: i.link,
        logo: i.logo,
        tags: i.tags
      }))
    )
    this.logos.set(this.previews.map((i) => (i.logo)))
  }
}
