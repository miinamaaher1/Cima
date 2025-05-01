import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MovieCardComponent } from "../shared/movie-card/movie-card.component";
import { TabsRelatedComponent } from "../tabs-related/tabs-related.component";

@Component({
  selector: 'app-tabs',
  imports: [CommonModule, MovieCardComponent, TabsRelatedComponent],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {

  selectedIndex = 0;
  isSeries:boolean=false;

  allTabs = [
    { label: 'Episodes', content: 'This is the Episodes tab content.' },
    { label: 'Promos', content: 'This is the Promos tab content.' },
    { label: 'Related', content: 'This is the Related tab content.' },
    { label: 'More Info', content: 'This is the More Info tab content.' }
    
  ];

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
