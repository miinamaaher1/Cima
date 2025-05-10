import { Component, Input, OnInit, signal } from "@angular/core";
import { IEpisode } from "../../../core/interfaces/IEpisode";
import { FormatTimePipe } from "../../../core/pipes/format-time.pipe";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

interface SeasonGroup {
    seasonNumber: number;
    episodes: IEpisode[];
}

@Component({
    selector: "app-episodes-list",
    imports: [FormatTimePipe, CommonModule, FormsModule],
    templateUrl: "./episodes-list.component.html",
    styleUrl: "./episodes-list.component.css",
})
export class EpisodesListComponent implements OnInit {
    @Input() episodes: IEpisode[] = [];
    @Input() mediaId: number = 0;
    selectedSeason = signal<number>(1);
    seasonGroups = signal<SeasonGroup[]>([]);

    constructor(private router: Router) {}

    ngOnInit() {
        this.groupEpisodesBySeason();
    }

    private groupEpisodesBySeason() {
        if (!this.episodes || this.episodes.length === 0) {
            this.seasonGroups.set([]);
            return;
        }

        // Group episodes by season
        const groups = this.episodes.reduce((acc, episode) => {
            const seasonNumber = episode.season_number;
            if (!acc[seasonNumber]) {
                acc[seasonNumber] = [];
            }
            acc[seasonNumber].push(episode);
            return acc;
        }, {} as { [key: number]: IEpisode[] });

        const sortedGroups = Object.entries(groups)
            .map(([seasonNumber, episodes]) => ({
                seasonNumber: parseInt(seasonNumber),
                episodes: episodes.sort((a, b) => a.episode_number - b.episode_number)
            }))
            .sort((a, b) => a.seasonNumber - b.seasonNumber);

        this.seasonGroups.set(sortedGroups);
        
        if (sortedGroups.length > 0 && !sortedGroups.find(group => group.seasonNumber === this.selectedSeason())) {
            this.selectedSeason.set(sortedGroups[0].seasonNumber);
        }
    }

    get currentSeasonEpisodes(): IEpisode[] {
        const season = this.seasonGroups().find(group => group.seasonNumber === this.selectedSeason());
        return season ? season.episodes : [];
    }

    onSeasonChange() {
        this.groupEpisodesBySeason();
    }

    onEpisodeClick(episode: IEpisode) {
        this.router.navigate(['/watch/series', this.mediaId], {
            queryParams: {
                s: episode.season_number,
                e: episode.episode_number
            }
        });
    }
}
