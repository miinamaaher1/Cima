import { Component, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SeriesService } from '../../../core/services/series/series.service';
import { SeasonService } from '../../../core/services/seasson/season.service';
import { language } from '../../../core/utils/language.enum';
import { EpisodeCardComponent } from "../../shared/episode-card/episode-card.component";
import { CommonModule } from '@angular/common';
import { IEpisodeDetails } from '../../../core/interfaces/IEpisodeDetails';

@Component({
  selector: 'app-tabs-episodes',
  imports: [CommonModule,EpisodeCardComponent],
  templateUrl: './tabs-episodes.component.html',
})
export class TabsEpisodesComponent implements OnInit, OnChanges {

  seriesId = input.required<number>();

  seasonsWithEpisodes: {
    seasonNumber: number;
    episodes: IEpisodeDetails[];
  }[] = [];

  constructor(private seriesService: SeriesService,private seasonService: SeasonService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchSeriesEpisodes()
  }

  ngOnInit(): void {
    this.fetchSeriesEpisodes()
  }

  fetchSeriesEpisodes() {
    this.seriesService.getSeriesDetails(this.seriesId(), language.english).subscribe({
      next: (ser) => {
        const totalSeasons = ser.number_of_seasons;

        for (let i = 1; i <= totalSeasons; i++) {
          this.seasonService.getSeasonDetails(this.seriesId(), i, language.english).subscribe({
            next: (data) => {
              const seasonEpisodes: IEpisodeDetails[] = data.episodes.
                filter(episode=>episode.runtime)
                .map((episode) => ({
                  episodeId: episode.id,
                  Poster: episode.still_path?`https://image.tmdb.org/t/p/w500${episode.still_path}`:`https://image.tmdb.org/t/p/w500${ser.backdrop_path}`,
                  episodeNum: episode.episode_number,
                  Runtime: episode.runtime,
                  Description: episode.overview?episode.overview.slice(0,100)+'...' :ser.overview.slice(0,100)+'...',
                }));

              this.seasonsWithEpisodes.push({
                seasonNumber: i,
                episodes: seasonEpisodes,
              });

              this.seasonsWithEpisodes.sort((a, b) => a.seasonNumber - b.seasonNumber);
            },
            error: (err) => console.log(`Error fetching season ${i}:`, err),
          });
        }
      },
      error: (err) => console.log('Error fetching series details:', err),
    });
  }
}
