import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenresService } from '../../../core/services/genres/genres.service';
import { language } from '../../../core/utils/language.enum';
import { MovieListServiceService } from '../../../core/services/lists/movieList/movie-list-service.service';

@Component({
  selector: 'app-media-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './media-list.component.html',
})
export class MediaListComponent {
  mediaItems: any[] = [];
  filteredMedia: any[] = [];
  searchTerm: string = '';
  filterType: string = 'all';
  filterGenre: string = 'all';
  genres: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  
  constructor(
    private genreService : GenresService,private mediaService :MovieListServiceService
  ) { }

  ngOnInit(): void {
    this.loadMedia();
    this.loadGenres();
  }

  loadMedia(): void {
    this.mediaService.getPopularMovies(1,language.english).subscribe(response => {
      this.mediaItems = response.results;
      this.filteredMedia = [...this.mediaItems];
      this.totalPages = Math.ceil(response.total_results / this.itemsPerPage);
      this.applyFilters();
    });
  }

  loadGenres(): void {
    this.genreService.getAllMovieGenres(language.english).subscribe(genres => {
      this.genres = genres.genres.map(g=>g.name);
    });
  }

  applyFilters(): void {
    let filtered = [...this.mediaItems];
    
    // Apply search term filter
    if (this.searchTerm.trim() !== '') {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (this.filterType !== 'all') {
      filtered = filtered.filter(item => item.type.toLowerCase() === this.filterType.toLowerCase());
    }
    
    // Apply genre filter
    if (this.filterGenre !== 'all') {
      filtered = filtered.filter(item => item.genres.includes(this.filterGenre));
    }
    
    this.filteredMedia = filtered;
  }

  search(): void {
    this.applyFilters();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadMedia();
  }

  viewDetails(id: string): void {
    // this.router.navigate(['/dashboard/media', id]);
  }

  deleteMedia(id: string, event: Event): void {
    event.stopPropagation();
    // if (confirm('Are you sure you want to delete this media?')) {
    //   this.mediaService.deleteMedia(id).subscribe(() => {
    //     this.mediaItems = this.mediaItems.filter(item => item.id !== id);
    //     this.filteredMedia = this.filteredMedia.filter(item => item.id !== id);
    //   });
    // }
  }
}
