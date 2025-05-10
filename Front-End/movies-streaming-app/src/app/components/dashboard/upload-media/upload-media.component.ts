import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { SeriesListServiceService } from '../../../core/services/lists/seriesList/series-list-service.service';
import { SeriesService } from '../../../core/services/series/series.service';
import { language } from '../../../core/utils/language.enum';
import { ISeries } from '../../../core/interfaces/ISeries';

export interface MediaFile {
  name: string;
  size: number;
  type: string;
  url?: string;
  previewUrl?: string;
}
export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  url?: string;
}

@Component({
  selector: 'app-media-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    CardModule,
    DividerModule,
    CheckboxModule,
    MultiSelectModule,
    TabViewModule
  ],
  providers: [MessageService],
  templateUrl: './upload-media.component.html',
  styleUrls: []
})
export class UploadMediaComponent implements OnInit {

  mediaForm: FormGroup;

  items: SelectItem[] = [];
  selectedItem: any = null;
  loading: boolean = false;


  mediaTypes: SelectItem[] = [
    { label: 'Movie', value: 'movie' },
    { label: 'Series', value: 'series' },
    { label: 'Episode', value: 'episode' }
  ];


  seriesOptions: SelectItem[] = [];
  seriesLoading: boolean = false;

  uploadedImages: UploadedFile[] = [];


  episodeUploadTypes: SelectItem[] = [
    { label: 'Next episode in current season', value: 'next_episode' },
    { label: 'First episode in new season', value: 'new_season' }
  ];

  genreOptions: SelectItem[] = [
    { label: 'Action', value: { id: 28, name: 'Action' } },
    { label: 'Adventure', value: { id: 12, name: 'Adventure' } },
    { label: 'Animation', value: { id: 16, name: 'Animation' } },
    { label: 'Comedy', value: { id: 35, name: 'Comedy' } },
    { label: 'Crime', value: { id: 80, name: 'Crime' } },
    { label: 'Documentary', value: { id: 99, name: 'Documentary' } },
    { label: 'Drama', value: { id: 18, name: 'Drama' } },
    { label: 'Family', value: { id: 10751, name: 'Family' } },
    { label: 'Fantasy', value: { id: 14, name: 'Fantasy' } },
    { label: 'History', value: { id: 36, name: 'History' } },
    { label: 'Horror', value: { id: 27, name: 'Horror' } },
    { label: 'Music', value: { id: 10402, name: 'Music' } },
    { label: 'Mystery', value: { id: 9648, name: 'Mystery' } },
    { label: 'Romance', value: { id: 10749, name: 'Romance' } },
    { label: 'Science Fiction', value: { id: 878, name: 'Science Fiction' } },
    { label: 'TV Movie', value: { id: 10770, name: 'TV Movie' } },
    { label: 'Thriller', value: { id: 53, name: 'Thriller' } },
    { label: 'War', value: { id: 10752, name: 'War' } },
    { label: 'Western', value: { id: 37, name: 'Western' } }
  ];

  posterImages: MediaFile[] = [];
  logoImages: MediaFile[] = [];
  videoContent: MediaFile[] = [];
  trailerVideos: MediaFile[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private seriesListService: SeriesListServiceService,
    private seriesService: SeriesService
  ) {

    this.mediaForm = this.fb.group({
      mediaType: ['movie', Validators.required],

      description: ['', [Validators.required, Validators.minLength(20)]],
      runtime: [null, [Validators.required, Validators.min(1)]],
      genres: [[], Validators.required],
      cast: ['', Validators.required],

      seriesId: [null],

      episodeUploadType: ['next_episode'],
      episodeNumber: [null],
      seasonNumber: [null],
      episodeTitle: ['']
    });
  }

  ngOnInit() {
    // Watch for changes in mediaType to adjust validation
    this.mediaForm.get('mediaType')?.valueChanges.subscribe(mediaType => {
      this.handleMediaTypeChange(mediaType);
    });
  }

  handleMediaTypeChange(mediaType: string) {
    this.mediaForm.get('title')?.clearValidators();
    this.mediaForm.get('seriesId')?.clearValidators();
    this.mediaForm.get('episodeTitle')?.clearValidators();
    this.mediaForm.get('episodeNumber')?.clearValidators();
    this.mediaForm.get('seasonNumber')?.clearValidators();

    if (mediaType === 'episode') {
      this.mediaForm.get('seriesId')?.setValidators(Validators.required);
      this.mediaForm.get('episodeTitle')?.setValidators(Validators.required);

      if (this.seriesOptions.length === 0) {
        this.loadSeriesOptions();
      }

      const episodeUploadType = this.mediaForm.get('episodeUploadType')?.value;
      if (episodeUploadType === 'next_episode') {
        this.mediaForm.get('episodeNumber')?.setValidators([Validators.required, Validators.min(1)]);
      } else if (episodeUploadType === 'new_season') {
        this.mediaForm.get('seasonNumber')?.setValidators([Validators.required, Validators.min(1)]);
        this.mediaForm.get('episodeNumber')?.setValue(1);
      }
    }

    this.mediaForm.get('title')?.updateValueAndValidity();
    this.mediaForm.get('seriesId')?.updateValueAndValidity();
    this.mediaForm.get('episodeTitle')?.updateValueAndValidity();
    this.mediaForm.get('episodeNumber')?.updateValueAndValidity();
    this.mediaForm.get('seasonNumber')?.updateValueAndValidity();
  }

  loadSeriesOptions() {
    this.seriesLoading = true;

    const uniqueSeriesIds = new Set<number>();
    const combinedResults: ISeries[] = [];

    this.seriesListService.getTopRatedTvSeries(1, language.english).subscribe({
      next: topRatedResponse => {
        topRatedResponse.results.forEach(series => {
          if (!uniqueSeriesIds.has(series.id)) {
            uniqueSeriesIds.add(series.id);
            combinedResults.push(series);
          }
        });

        this.seriesListService.getPopularTvSeries(1, language.english).subscribe({
          next: popularResponse => {
            popularResponse.results.forEach(series => {
              if (!uniqueSeriesIds.has(series.id)) {
                uniqueSeriesIds.add(series.id);
                combinedResults.push(series);
              }
            });

            this.seriesOptions = combinedResults.map(series => ({
              label: series.name,
              value: series.id
            }));

            this.seriesLoading = false;
          },
          error: (err) => {
            console.error('Error fetching popular series:', err);
            this.seriesLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to load series data'
            });
          }
        });
      },
      error: (err) => {
        console.error('Error fetching top rated series:', err);
        this.seriesLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load series data'
        });
      }
    });
  }

  onEpisodeUploadTypeChange() {
    const episodeUploadType = this.mediaForm.get('episodeUploadType')?.value;

    this.mediaForm.get('episodeNumber')?.clearValidators();
    this.mediaForm.get('seasonNumber')?.clearValidators();

    if (episodeUploadType === 'next_episode') {
      this.mediaForm.get('episodeNumber')?.setValidators([Validators.required, Validators.min(1)]);
      this.mediaForm.get('seasonNumber')?.setValue(null);
    } else if (episodeUploadType === 'new_season') {
      this.mediaForm.get('seasonNumber')?.setValidators([Validators.required, Validators.min(1)]);
      this.mediaForm.get('episodeNumber')?.setValue(1);
    }

    this.mediaForm.get('episodeNumber')?.updateValueAndValidity();
    this.mediaForm.get('seasonNumber')?.updateValueAndValidity();
  }

  onSeriesSelected(event: any) {
    const seriesId = event.value;

    if (seriesId) {
      this.seriesService.getSeriesDetails(seriesId, language.english).subscribe({
        next: (details) => {
          if (this.mediaForm.get('episodeUploadType')?.value === 'next_episode') {
            if (details.last_episode_to_air) {
              this.mediaForm.get('seasonNumber')?.setValue(details.last_episode_to_air.season_number);
              this.mediaForm.get('episodeNumber')?.setValue(details.last_episode_to_air.episode_number + 1);
            }
          } else if (this.mediaForm.get('episodeUploadType')?.value === 'new_season') {
            this.mediaForm.get('seasonNumber')?.setValue(details.number_of_seasons + 1);
            this.mediaForm.get('episodeNumber')?.setValue(1);
          }
        },
        error: (err) => {
          console.error('Error fetching series details:', err);
        }
      });
    }
  }

  // File upload handlers
  onPosterUpload(event: any) {
    for (let file of event.files) {
      const fileUrl = URL.createObjectURL(file);

      const mediaFile: MediaFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl
      };

      this.posterImages.push(mediaFile);
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Poster Uploaded',
      detail: `${event.files.length} poster image(s) uploaded successfully`
    });
  }

  onLogoUpload(event: any) {
    for (let file of event.files) {
      const fileUrl = URL.createObjectURL(file);

      const mediaFile: MediaFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl
      };

      this.logoImages.push(mediaFile);
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Logo Uploaded',
      detail: `${event.files.length} logo image(s) uploaded successfully`
    });
  }

  onVideoUpload(event: any) {
    for (let file of event.files) {
      const fileUrl = URL.createObjectURL(file);

      const mediaFile: MediaFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl,
        previewUrl: fileUrl
      };

      this.videoContent.push(mediaFile);
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Video Content Uploaded',
      detail: `${event.files.length} video(s) uploaded successfully`
    });
  }

  onTrailerUpload(event: any) {
    for (let file of event.files) {
      const fileUrl = URL.createObjectURL(file);

      const mediaFile: MediaFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl,
        previewUrl: fileUrl
      };

      this.trailerVideos.push(mediaFile);
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Trailer Uploaded',
      detail: `${event.files.length} trailer(s) uploaded successfully`
    });
  }

  // File removal handlers
  removePoster(file: MediaFile) {
    this.posterImages = this.posterImages.filter(f => f !== file);
    if (file.url) URL.revokeObjectURL(file.url);

    this.messageService.add({
      severity: 'info',
      summary: 'Poster Removed',
      detail: `${file.name} was removed`
    });
  }

  removeLogo(file: MediaFile) {
    this.logoImages = this.logoImages.filter(f => f !== file);
    if (file.url) URL.revokeObjectURL(file.url);

    this.messageService.add({
      severity: 'info',
      summary: 'Logo Removed',
      detail: `${file.name} was removed`
    });
  }

  removeVideo(file: MediaFile) {
    this.videoContent = this.videoContent.filter(f => f !== file);
    if (file.url) URL.revokeObjectURL(file.url);

    this.messageService.add({
      severity: 'info',
      summary: 'Video Removed',
      detail: `${file.name} was removed`
    });
  }

  removeTrailer(file: MediaFile) {
    this.trailerVideos = this.trailerVideos.filter(f => f !== file);
    if (file.url) URL.revokeObjectURL(file.url);

    this.messageService.add({
      severity: 'info',
      summary: 'Trailer Removed',
      detail: `${file.name} was removed`
    });
  }

  // File upload handler for images
  onImageUpload(event: any) {
    for (let file of event.files) {
      const fileUrl = URL.createObjectURL(file);

      const uploadedFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl
      };

      this.uploadedImages.push(uploadedFile);
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Image Uploaded',
      detail: `${event.files.length} image(s) uploaded successfully`
    });
  }

  // Method to remove an image
  removeImage(file: UploadedFile) {
    this.uploadedImages = this.uploadedImages.filter(f => f !== file);
    if (file.url) URL.revokeObjectURL(file.url);

    this.messageService.add({
      severity: 'info',
      summary: 'Image Removed',
      detail: `${file.name} was removed`
    });
  }

  onSubmit() {
    if (this.mediaForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill all required fields correctly'
      });

      Object.keys(this.mediaForm.controls).forEach(key => {
        const control = this.mediaForm.get(key);
        control?.markAsTouched();
      });

      return;
    }


    console.log('Form data:', this.mediaForm.value);
    console.log('Poster images:', this.posterImages);
    console.log('Logo images:', this.logoImages);
    console.log('Video content:', this.videoContent);
    console.log('Trailer videos:', this.trailerVideos);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Media uploaded successfully'
    });
  }

  ngOnDestroy() {
    // Clean up all created object URLs
    [...this.posterImages, ...this.logoImages, ...this.videoContent, ...this.trailerVideos, ...this.uploadedImages].forEach(file => {
      if (file.url) URL.revokeObjectURL(file.url);
    });
  }
}