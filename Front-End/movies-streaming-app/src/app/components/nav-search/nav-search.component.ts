import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../core/services/search/search.service';
import { language } from '../../core/utils/language.enum';
import { IMedia } from '../../core/interfaces/IMedia';
import { MovieCardComponent } from "../shared/movie-card/movie-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-search',
  imports: [FormsModule,CommonModule, MovieCardComponent],
  templateUrl: './nav-search.component.html',
  styles: ``
})
export class NavSearchComponent {
  isSearchOpen = false;
  searchQuery = '';

  //movie_type --> movie | tv
  media:Pick<IMedia,"id" | "media_type">[]=[]

  constructor(private searchService:SearchService ){}

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {

      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) 
          searchInput.focus();
      }, 0);
    } else {
      document.body.style.overflow = '';
    }
  }

  closeSearch() {
    this.isSearchOpen = false;
    this.searchQuery = '';
    this.media = [];
    document.body.style.overflow = '';
  }

  search() {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      // implememtttttttttttttttt  <----------------
      this.searchService.SearchInAllMedia(this.searchQuery,true,language.english,1).subscribe({
        next: med=>{
          this.media = med.results.map(({id,media_type})=>({id,media_type}));
        },
        error:err=>{
          console.log(err)
        }
      })
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isSearchOpen) {
      this.closeSearch();
    }
  }
}