import { Component } from "@angular/core";
import { VideoStreamComponent } from "../video-stream/video-stream.component";
import { WatchEpisodesComponent } from "../watch-episodes/watch-episodes.component";
import { NgClass } from "@angular/common";
import { EpisodesListComponent } from "../episodes-list/episodes-list.component";

@Component({
    selector: "app-watch-area",
    imports: [VideoStreamComponent, WatchEpisodesComponent, NgClass, EpisodesListComponent],
    templateUrl: "./watch-area.component.html",
    styleUrl: "./watch-area.component.css",
})
export class WatchAreaComponent {
    IsSidebarOpen : boolean = true;

    onSidebarToggle(status : boolean){
        this.IsSidebarOpen = status;
    }
}
