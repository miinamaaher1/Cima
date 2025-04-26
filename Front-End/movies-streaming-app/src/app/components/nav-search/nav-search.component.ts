import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-search',
  imports: [FormsModule],
  templateUrl: './nav-search.component.html',
  styles: ``
})
export class NavSearchComponent {
  isSearchOpen = false;
  searchQuery = '';

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
    document.body.style.overflow = '';
  }

  search() {
    if (this.searchQuery.trim()) {
      //console.log('Searching for:', this.searchQuery);
      
      // implememtttttttttttttttt  <----------------
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isSearchOpen) {
      this.closeSearch();
    }
  }
}