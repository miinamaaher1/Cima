import { Component } from "@angular/core";
import { VideoStreamComponent } from "../video-stream/video-stream.component";
import { WatchEpisodesComponent } from "../watch-episodes/watch-episodes.component";
import { NgClass } from "@angular/common";
import { EpisodesListComponent } from "../episodes-list/episodes-list.component";
import { IEpisode } from "../../../core/interfaces/IEpisode";
import { IMovie } from "../../../core/interfaces/IMovie";
import { ImageService } from "../../../core/services/utils/image.service";
import { IImage } from "../../../core/interfaces/IImage";

@Component({
    selector: "app-watch-area",
    imports: [VideoStreamComponent, WatchEpisodesComponent, NgClass, EpisodesListComponent],
    templateUrl: "./watch-area.component.html",
    styleUrl: "./watch-area.component.css",
})
export class WatchAreaComponent {
    IsSidebarOpen: boolean = false;
    episodes: IEpisode[] = [];
    similarMovies: IMovie[] = [];
    mediaType: string = '';
    posterUrl: string = '';
    mediaTitle: string = '';
    mediaId: number = 0;

    constructor(private imageService: ImageService) {}

    onSidebarToggle(status: boolean) {
        this.IsSidebarOpen = status;
    }

    getEpisodeImage(stillPath: string | null): string {
        if (!stillPath) return '';
        const imageObject: IImage = {
            file_path: stillPath,
            aspect_ratio: 1,
            height: 0,
            iso_639_1: null,
            vote_average: 0,
            vote_count: 0,
            width: 0
        };
        return this.imageService.getImagePath(imageObject);
    }
}
