import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MovieCardComponent } from "../shared/movie-card/movie-card.component";
import { TabsRelatedComponent } from "../tabs-related/tabs-related.component";
import { MovieService } from '../../core/services/movie/movie.service';
import { SeriesService } from '../../core/services/series/series.service';
import { language } from '../../core/utils/language.enum';
import { IMediaDetails } from './Interface/IMediaDetails';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule, MovieCardComponent, TabsRelatedComponent],
  templateUrl: './tabs.component.html',
})
export class TabsComponent implements OnInit {

  selectedIndex = 0;
  isSeries:boolean = false;
  
  mediadetails: IMediaDetails = {
    countSeasons: 0,
    countEpisodes: 0,
    categories: [],
    description: '',
    cast: []
  };
  @Input() mediaId:number=315635;

  constructor(private movieService:MovieService ,private seriesService:SeriesService ){}
  
  ngOnInit(): void {
    this.fetchMediaInfo();
  }

  allTabs = [
    { label: 'Episodes', content: 'This is the Episodes tab content.' },
    { label: 'Promos', content: 'This is the Promos tab content.' },
    { label: 'Related', content: 'This is the Related tab content.' },
    { label: 'More Info', content: 'This is the More Info tab content.' }
    
  ];

  fetchMediaInfo(){
    if(this.isSeries){
      this.seriesService.getSeriesDetails(this.mediaId,language.english).subscribe({
        next: details=>{
          this.mediadetails.countSeasons=details.seasons.length;
          this.mediadetails.countEpisodes=details.number_of_episodes;
          this.mediadetails.description=details.overview;
          this.mediadetails.categories.push(...details.genres);
          
        },
        error: err=>
        {
          console.log(`cannot get details for series with id ${this.mediaId}`)
        }
      })
      this.seriesService.getSeriesCredits(this.mediaId,language.english).subscribe({
        next: credits=>{
          this.mediadetails.cast.push(...credits.cast.map(c => c.name))
        }
      })

    }
    else
    {
      this.movieService.getMovieDetails(this.mediaId,language.english).subscribe({
        next: details=>{
          this.mediadetails.description=details.overview;
          this.mediadetails.categories.push(...details.genres);
          
        },
        error: err=>
        {
          console.log(`cannot get details for series with id ${this.mediaId}`)
        }
      })
      this.movieService.getMovieCredits(this.mediaId,language.english).subscribe({
        next: credits=>{
          this.mediadetails.cast.push(...credits.cast.map(c=>c.name).slice(0,10))
        }
      }) 
    }
  } 

  get tabs(){
    if(this.isSeries)
      return this.allTabs;
    else
      return this.allTabs.filter(t=>t.label=="Related"||t.label=="More Info");
  }


  selectTab(index: number) {
    this.selectedIndex = index;
  }
}
