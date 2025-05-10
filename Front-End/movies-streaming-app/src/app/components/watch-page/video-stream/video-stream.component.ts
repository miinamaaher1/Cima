import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { VideoPlayerControlsComponent } from "../video-player-controls/video-player-controls.component";
import { ActivatedRoute, Router } from '@angular/router';
import { mediaType } from '../../../core/utils/media-type.enum';
import { MovieService } from '../../../core/services/movie/movie.service';
import { SeriesService } from '../../../core/services/series/series.service';
import { SeasonService } from '../../../core/services/seasson/season.service';
import { VideosService } from '../../../core/services/videos/videos.service';
import { language } from '../../../core/utils/language.enum';
import { IEpisode } from '../../../core/interfaces/IEpisode';
import { IMovieDetails } from '../../../core/interfaces/IMovieDetails';
import { ISeriesDetails } from '../../../core/interfaces/ISeriesDetails';
import { IMovie } from '../../../core/interfaces/IMovie';
import { EpisodesListComponent } from '../episodes-list/episodes-list.component';
import { WatchEpisodesComponent } from '../watch-episodes/watch-episodes.component';
import { forkJoin } from 'rxjs';
import { IStreamData } from '../../../core/interfaces/istream-data';

@Component({
    selector: 'app-video-stream',
    imports: [NgClass, NgIf, NgFor, VideoPlayerControlsComponent, EpisodesListComponent, WatchEpisodesComponent],
    templateUrl: './video-stream.component.html',
    styleUrl: './video-stream.component.css'
})
export class VideoStreamComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private moviesService: MovieService,
        private seriesService: SeriesService,
        private seasonService: SeasonService,
        private videosService: VideosService
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
    currentSeason: number = 1;
    currentEpisode: number = 1;

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
    @Output() emitMediaId = new EventEmitter<number>();

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.mediaId = Number(params.get('id'));
            this.type = params.get('type') as string;
            
            
            this.route.queryParams.subscribe(queryParams => {
                this.currentSeason = Number(queryParams['s']) || 1;
                this.currentEpisode = Number(queryParams['e']) || 1;
                

                if (this.type === 'movie') {
                    this.currentSeason = 1;
                    this.currentEpisode = 1;
                }
                
                this.loadMediaData();
                this.emitMediaId.emit(this.mediaId);
            });
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
                
                // Get video stream URL
                this.videosService.getMedia(movie.title).subscribe({
                    next: (streamData: IStreamData[]) => {
                        if (streamData && streamData.length > 0) {
                            // Get the highest quality stream
                            const highestQuality = streamData.reduce((prev, current) => 
                                (current.quality > prev.quality) ? current : prev
                            );
                            this.videoUrl = highestQuality.url;
                            console.log('Video URL loaded:', this.videoUrl); // Debug log
                        } else {
                            console.error('No video stream data available');
                        }
                    },
                    error: (err) => {
                        console.error('Error fetching video stream:', err);
                    }
                });
            },
            error: (err) => console.error('Error fetching movie details:', err)
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

                // Get video stream URL with season and episode
                if (series.name) {
                    const mediaName = `${series.name}_S${this.currentSeason}E${this.currentEpisode}`;
                    this.videosService.getMedia(mediaName).subscribe({
                        next: (streamData) => {
                            if (streamData && streamData.length > 0) {
                                // Get the highest quality stream
                                const highestQuality = streamData.reduce((prev, current) => 
                                    (current.quality > prev.quality) ? current : prev
                                );
                                this.videoUrl = highestQuality.url;
                                console.log('Video URL loaded:', this.videoUrl); // Debug log
                            } else {
                                console.error('No video stream data available');
                            }
                        },
                        error: (err) => {
                            console.error('Error fetching video stream:', err);
                        }
                    });
                }

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

    // Method to update season and episode
    updateSeasonAndEpisode(season: number, episode: number) {
        if (this.type === 'series') {
            this.currentSeason = season;
            this.currentEpisode = episode;
            
            // Update URL with new parameters
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {
                    s: season,
                    e: episode
                },
                queryParamsHandling: 'merge'
            });

            // Reload video
            this.loadSeriesData();
        }
    }
}
