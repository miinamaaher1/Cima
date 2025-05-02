import { Component, Input } from "@angular/core";
import { IMovieEpisode } from "../watch-episodes/watch-episodes.component";



@Component({
    selector: "app-episodes-list",
    imports: [],
    templateUrl: "./episodes-list.component.html",
    styleUrl: "./episodes-list.component.css",
})
export class EpisodesListComponent {
    @Input() episodes: IMovieEpisode[] = [];
}
