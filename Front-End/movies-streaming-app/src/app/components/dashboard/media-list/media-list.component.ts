import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenresService } from '../../../core/services/genres/genres.service';
import { language } from '../../../core/utils/language.enum';
import { MovieListServiceService } from '../../../core/services/lists/movieList/movie-list-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './media-list.component.html',
})
export class MediaListComponent implements OnInit {
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
    private genreService: GenresService,
    private mediaService: MovieListServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMedia();
    this.loadGenres();
  }

  loadMedia(): void {
    this.genreService.getAllMovieGenres(language.english).subscribe((genreResponse: any) => {
      const genreMap = new Map<number, string>();
      genreResponse.genres.forEach((g: any) => genreMap.set(g.id, g.name));

      this.mediaService.getPopularMovies(1, language.english).subscribe((response: any) => {
        this.mediaItems = response.results.map((item: any) => ({
          ...item,
          description: item.overview || '',
          type: item.media_type || 'movie',
          genres: (item.genre_ids || []).map((id: number) => genreMap.get(id)).filter(Boolean),
          addedDate: new Date(),
          views: Math.floor(Math.random() * 10000),
          thumbnail: `https://image.tmdb.org/t/p/w200${item.poster_path}`
        }));
        this.totalPages = Math.ceil(this.mediaItems.length / this.itemsPerPage);
        this.applyFilters();
      });
    });
  }


  loadGenres(): void {
    this.genreService.getAllMovieGenres(language.english).subscribe((genres: any) => {
      this.genres = genres.genres.map((g: any) => g.name);
    });
  }

  applyFilters(): void {
    let filtered = [...this.mediaItems];

    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(term) || item.description.toLowerCase().includes(term)
      );
    }

    if (this.filterType !== 'all') {
      filtered = filtered.filter(item => item.type === this.filterType);
    }

    if (this.filterGenre !== 'all') {
      filtered = filtered.filter(item => item.genres.includes(this.filterGenre));
    }

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredMedia = filtered.slice(start, end);
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
  }

  search(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilters();
    }
  }

  viewDetails(mediaId: number): void {
    this.router.navigate(['/details/movie', mediaId]);
  }

  deleteMedia(mediaId: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this media?')) {
      this.mediaItems = this.mediaItems.filter(item => item.id !== mediaId);
      this.applyFilters();
    }
  }

  unlistMedia(mediaId: number, event: Event) : void {
    event.stopPropagation();
  }
}
