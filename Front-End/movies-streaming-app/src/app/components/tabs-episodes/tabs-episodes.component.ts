import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabs-episodes',
  imports: [],
  templateUrl: './tabs-episodes.component.html',
  styleUrl: './tabs-episodes.component.css'
})
export class TabsEpisodesComponent {

  episodesIds:number[]=[]
  @Input() seriesId:number=0

  constructor(){}

  
}
