import { Component, Input } from '@angular/core';
import { EpisodesListComponent } from '../episodes-list/episodes-list.component';


export interface IMovieEpisode {
    title: string;
    number: number;
    imageUrl: string;
    duration: number; // in minutes
}

const episodeList: IMovieEpisode[] = [
    {
        title: "Spider-Man: Into the Spider-Verse",
        number: 1,
        imageUrl: "/assets/images/episode_example_thumbnail.png",
        duration: 117,
    },
    {
        title: "Spider-Man: Far From Home",
        number: 2,
        imageUrl: "/assets/images/episode_example_thumbnail.png",
        duration: 129,
    },
    {
        title: "Spider-Man: No Way Home",
        number: 3,
        imageUrl: "/assets/images/episode_example_thumbnail.png",
        duration: 148,
    },
    {
        title: "Spider-Man: Homecoming",
        number: 4,
        imageUrl: "/assets/images/episode_example_thumbnail.png",
        duration: 133,
    },
    {
        title: "The Amazing Spider-Man",
        number: 5,
        imageUrl: "/assets/images/episode_example_thumbnail.png",
        duration: 136,
    },
    {
        title: "The Amazing Spider-Man 2",
        number: 6,
        imageUrl: "/assets/images/episode_example_thumbnail.png",
        duration: 142,
    },
    {
        title: "Spider-Man (2002)",
        number: 7,
        imageUrl: "/assets/images/episode_example_thumbnail.png",
        duration: 121,
    },
    {
        title: "Spider-Man 2 (2004)",
        number: 8,
        imageUrl: "/assets/images/episode_example_thumbnail.png",
        duration: 127,
    },
    {
        title: "Spider-Man 3 (2007)",
        number: 9,
        imageUrl: "/assets/images/episode_example_thumbnail.png",
        duration: 139,
    },
];

@Component({
  selector: 'app-watch-episodes',
  imports: [EpisodesListComponent],
  templateUrl: './watch-episodes.component.html',
  styleUrl: './watch-episodes.component.css'
})
export class WatchEpisodesComponent {
    episodesList : IMovieEpisode[] = episodeList;
}
