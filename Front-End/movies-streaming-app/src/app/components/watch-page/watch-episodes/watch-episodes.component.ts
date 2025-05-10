import { Component, Input } from '@angular/core';
import { EpisodesListComponent } from '../episodes-list/episodes-list.component';
import { IEpisode } from '../../../core/interfaces/IEpisode';
import { IMovie } from '../../../core/interfaces/IMovie';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watch-episodes',
  imports: [EpisodesListComponent, NgIf, NgFor],
  templateUrl: './watch-episodes.component.html',
  styleUrl: './watch-episodes.component.css'
})
export class WatchEpisodesComponent {
    @Input() episodes: IEpisode[] = [];
    @Input() similarMovies: IMovie[] = [];
    @Input() mediaType: string = '';
    @Input() posterUrl: string = '';
    @Input() mediaTitle: string = '';
    @Input() mediaId: number = 0;

    constructor(private router: Router) {}

    onMovieClick(movie: IMovie) {
        this.router.navigate(['/watch/movie', movie.id]);
    }
}
