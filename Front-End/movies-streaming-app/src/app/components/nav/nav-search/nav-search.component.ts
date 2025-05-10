import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../core/services/search/search.service';
import { language } from '../../../core/utils/language.enum';
import { IMedia } from '../../../core/interfaces/IMedia';
import { MovieCardComponent } from "../../shared/movie-card/movie-card.component";
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { SerieCardComponent } from '../../shared/serie-card/serie-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-search',
  imports: [FormsModule, CommonModule, MovieCardComponent, SerieCardComponent],
  templateUrl: './nav-search.component.html',
  styles: ``
})
export class NavSearchComponent implements OnInit {
  isSearchOpen = false;
  searchQuery = '';

  //movie_type --> movie | tv
  media: Pick<IMedia, "id" | "media_type">[] = [];

  private searchSubject = new Subject<string>();

  constructor(private searchService: SearchService, private router: Router) {
    this.setupSearchListener();
  }
  ngOnInit(): void {
    this.closeSearch();
  }


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

  onSearchChange() {
    this.searchSubject.next(this.searchQuery);
  }

  private setupSearchListener() {
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((query) => {
        if (!query.trim()) {
          this.media = [];
          return [];
        }
        return this.searchService.SearchInAllMedia(query, true, language.english, 1);
      })
    ).subscribe({
      next: (med) => {
        if (Array.isArray(med?.results)) {
          this.media = med.results.map(({ id, media_type }) => ({ id, media_type }));
        }
      },
      error: (err) => {
        console.error('Search error:', err);
      }
    });
  }

  onMovieCardClick() {
    this.closeSearch();
  }
  onSeriesCardClick() {
    this.closeSearch();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isSearchOpen) {
      this.closeSearch();
    }
  }
}