import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { VideoPlayerControlsComponent } from "../video-player-controls/video-player-controls.component";
import { ActivatedRoute } from '@angular/router';
import { mediaType } from '../../../core/utils/media-type.enum';
import { MovieService } from '../../../core/services/movie/movie.service';
import { SeriesService } from '../../../core/services/series/series.service';
import { SeasonService } from '../../../core/services/seasson/season.service';
import { language } from '../../../core/utils/language.enum';
import { IEpisode } from '../../../core/interfaces/IEpisode';
import { IMovieDetails } from '../../../core/interfaces/IMovieDetails';
import { ISeriesDetails } from '../../../core/interfaces/ISeriesDetails';
import { IMovie } from '../../../core/interfaces/IMovie';
import { EpisodesListComponent } from '../episodes-list/episodes-list.component';
import { WatchEpisodesComponent } from '../watch-episodes/watch-episodes.component';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-video-stream',
    imports: [NgClass, NgIf, NgFor, VideoPlayerControlsComponent, EpisodesListComponent, WatchEpisodesComponent],
    templateUrl: './video-stream.component.html',
    styleUrl: './video-stream.component.css'
})
export class VideoStreamComponent implements OnInit {
    constructor(
        private route: ActivatedRoute, 
        private moviesService: MovieService, 
        private seriesService: SeriesService,
        private seasonService: SeasonService
    ) { }

    IsSidebarOpen: boolean = false;
    IsPremiumUser: boolean = false;
    ISHD: boolean = false;
    mediaId!: number;
    mediaType!: mediaType;
    type!: string;
    videoUrl: string = "";
    mediaDetails: IMovieDetails | ISeriesDetails | null = null;
    episodes: IEpisode[] = [];
    similarMovies: IMovie[] = [];
    posterUrl: string = "";

    get mediaTitle(): string {
        if (!this.mediaDetails) return '';
        return 'title' in this.mediaDetails ? this.mediaDetails.title : this.mediaDetails.name;
    }

    @Output() emitToggleSidebarValue = new EventEmitter<boolean>();
    @Output() emitEpisodes = new EventEmitter<IEpisode[]>();
    @Output() emitSimilarMovies = new EventEmitter<IMovie[]>();
    @Output() emitMediaType = new EventEmitter<string>();
    @Output() emitPosterUrl = new EventEmitter<string>();
    @Output() emitMediaTitle = new EventEmitter<string>();

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.mediaId = Number(params.get('id'));
            this.type = params.get('type') as string;
            this.loadMediaData();
        });
    }

    private loadMediaData() {
        if (this.type === 'movie') {
            this.mediaType = mediaType.movie;
            this.loadMovieData();
        } else if (this.type === 'series') {
            this.mediaType = mediaType.series;
            this.loadSeriesData();
        }
    }

    private loadMovieData() {
        // Get movie details
        this.moviesService.getMovieDetails(this.mediaId, language.english).subscribe({
            next: (movie) => {
                this.mediaDetails = movie;
                this.posterUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
                this.emitPosterUrl.emit(this.posterUrl);
                this.emitMediaTitle.emit(this.mediaTitle);
            },
            error: (err) => console.error('Error fetching movie details:', err)
        });

        // Get movie video
        this.moviesService.getMovieVideos(this.mediaId, language.english).subscribe({
            next: (movie) => {
                if (movie.results && movie.results.length > 0) {
                    const id = movie.results[0].key;
                    this.videoUrl = `https://www.youtube.com/watch?v=${id}`;
                }
            },
            error: (err) => console.error('Error fetching movie video:', err)
        });

        // Get similar movies
        this.moviesService.getSimilarMovies(this.mediaId, language.english).subscribe({
            next: (response) => {
                this.similarMovies = response.results;
                this.emitSimilarMovies.emit(this.similarMovies);
                this.emitMediaType.emit(this.type);
            },
            error: (err) => console.error('Error fetching similar movies:', err)
        });
    }

    private loadSeriesData() {
        // Get series details
        this.seriesService.getSeriesDetails(this.mediaId, language.english).subscribe({
            next: (series) => {
                this.mediaDetails = series;
                this.posterUrl = `https://image.tmdb.org/t/p/original${series.poster_path}`;
                this.emitPosterUrl.emit(this.posterUrl);
                this.emitMediaTitle.emit(this.mediaTitle);
                
                const seasonRequests = Array.from(
                    { length: series.number_of_seasons }, 
                    (_, i) => this.seasonService.getSeasonDetails(this.mediaId, i + 1, language.english)
                );

                // Use forkJoin to wait for all season details
                forkJoin(seasonRequests).subscribe({
                    next: (seasons) => {
                        this.episodes = seasons.flatMap(season => season.episodes);
                        this.emitEpisodes.emit(this.episodes);
                        this.emitMediaType.emit(this.type);
                    },
                    error: (err) => console.error('Error fetching season details:', err)
                });
            },
            error: (err) => console.error('Error fetching series details:', err)
        });
    }

    toogleSideBar() {
        this.IsSidebarOpen = !this.IsSidebarOpen;
        this.sendToogleSidebarStatus();
    }

    sendToogleSidebarStatus() {
        this.emitToggleSidebarValue.emit(this.IsSidebarOpen);
    }
}
