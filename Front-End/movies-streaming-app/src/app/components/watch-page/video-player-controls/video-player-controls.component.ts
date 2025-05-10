import { NgClass } from "@angular/common";
import { Component, ElementRef, Input, ViewChild, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from "@angular/core";
import { FormatTimePipe } from "../../../core/pipes/format-time.pipe";
import { VideoQualitySettingComponent } from "../video-quality-setting/video-quality-setting.component";

@Component({
    selector: "app-video-player-controls",
    imports: [NgClass, FormatTimePipe, VideoQualitySettingComponent],
    templateUrl: "./video-player-controls.component.html",
    styleUrl: "./video-player-controls.component.css",
})
export class VideoPlayerControlsComponent implements AfterViewInit, OnDestroy, OnChanges {
    @Input()
    url: string = "";
    @ViewChild("videoPlayer")
    videoPlayer!: ElementRef<HTMLVideoElement>;

    isPlaying = false;
    isMuted = false;
    currentTime = 0;
    duration = 0;
    volume = 1;
    isFullScreen = false;
    private videoElement: HTMLVideoElement | null = null;

    ngAfterViewInit() {
        this.videoElement = this.videoPlayer.nativeElement;
        this.setupVideoEvents();
        this.loadVideo();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['url'] && !changes['url'].firstChange) {
            this.loadVideo();
        }
    }

    ngOnDestroy() {
        if (this.videoElement) {
            this.videoElement.pause();
            this.videoElement.src = '';
            this.videoElement.load();
        }
    }

    private loadVideo() {
        if (!this.videoElement || !this.url) return;

        // Reset video state
        this.videoElement.pause();
        this.currentTime = 0;
        this.duration = 0;
        this.isPlaying = false;

        // Set new source
        this.videoElement.src = this.url;
        this.videoElement.load();

        // Try to play the video
        this.videoElement.play().catch(error => {
            console.error('Error playing video:', error);
        });
    }

    private setupVideoEvents() {
        if (!this.videoElement) return;

        // Play/Pause events
        this.videoElement.addEventListener('play', () => {
            this.isPlaying = true;
        });

        this.videoElement.addEventListener('pause', () => {
            this.isPlaying = false;
        });

        // Time update event
        this.videoElement.addEventListener('timeupdate', () => {
            this.currentTime = this.videoElement?.currentTime || 0;
        });

        // Duration change event
        this.videoElement.addEventListener('durationchange', () => {
            this.duration = this.videoElement?.duration || 0;
        });

        // Volume change event
        this.videoElement.addEventListener('volumechange', () => {
            if (this.videoElement) {
                this.volume = this.videoElement.volume;
                this.isMuted = this.videoElement.muted;
            }
        });

        // Fullscreen change event
        document.addEventListener('fullscreenchange', () => {
            this.isFullScreen = document.fullscreenElement !== null;
        });

        // Error handling
        this.videoElement.addEventListener('error', (e) => {
            console.error('Video error:', e);
        });

        // Loaded metadata event
        this.videoElement.addEventListener('loadedmetadata', () => {
            this.duration = this.videoElement?.duration || 0;
        });
    }

    togglePlayPause() {
        if (!this.videoElement) return;

        if (this.videoElement.paused) {
            this.videoElement.play().catch(error => {
                console.error('Error playing video:', error);
            });
        } else {
            this.videoElement.pause();
        }
    }

    toggleMute() {
        if (!this.videoElement) return;
        
        this.videoElement.muted = !this.videoElement.muted;
        this.isMuted = this.videoElement.muted;
        
        if (!this.isMuted) {
            this.videoElement.volume = this.volume || 0.5;
        }
    }

    progressForward() {
        if (!this.videoElement) return;
        
        this.videoElement.currentTime = Math.min(
            this.videoElement.currentTime + 5,
            this.videoElement.duration
        );
    }

    progressBackward() {
        if (!this.videoElement) return;
        
        this.videoElement.currentTime = Math.max(
            this.videoElement.currentTime - 5,
            0
        );
    }

    getProgressBackground(): string {
        const percentage = (this.currentTime / this.duration) * 100 || 0;
        return `linear-gradient(to right, #3b82f6 ${percentage}%, #d1d5db ${percentage}%)`;
    }

    getVolumeBackground(): string {
        const percentage = this.volume * 100 || 0;
        return `linear-gradient(to right, #6366f1 ${percentage}%, #d1d5db ${percentage}%)`;
    }

    changeVolume(event: Event) {
        if (!this.videoElement) return;
        
        const input = event.target as HTMLInputElement;
        const volumeValue = Number(input.value);
        
        this.videoElement.volume = volumeValue;
        this.volume = volumeValue;
        this.isMuted = volumeValue === 0;
    }

    setDuration() {
        if (!this.videoElement) return;
        this.duration = this.videoElement.duration;
    }

    goFullScreen() {
        if (!this.videoElement) return;
        
        if (this.videoElement.requestFullscreen) {
            this.videoElement.requestFullscreen();
        } else if ((this.videoElement as any).webkitRequestFullscreen) {
            (this.videoElement as any).webkitRequestFullscreen();
        } else if ((this.videoElement as any).msRequestFullscreen) {
            (this.videoElement as any).msRequestFullscreen();
        }
    }
    
    exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
        }
    }

    updateProgress() {
        if (!this.videoElement) return;
        this.currentTime = this.videoElement.currentTime;
    }

    seekVideo(event: Event) {
        if (!this.videoElement) return;
        
        const input = event.target as HTMLInputElement;
        const seekTime = Number(input.value);
        
        this.videoElement.currentTime = seekTime;
        this.currentTime = seekTime;
    }

    handleVideoError(event: Event) {
        const videoError = (event.target as HTMLVideoElement).error;
        console.error('Video error:', videoError);
    }
}
