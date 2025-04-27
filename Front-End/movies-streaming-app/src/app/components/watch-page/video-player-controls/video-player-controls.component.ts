import { NgClass } from "@angular/common";
import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { FormatTimePipe } from "../../../core/pipes/format-time.pipe";
import { VideoQualitySettingComponent } from "../video-quality-setting/video-quality-setting.component";

@Component({
    selector: "app-video-player-controls",
    imports: [NgClass, FormatTimePipe, VideoQualitySettingComponent],
    templateUrl: "./video-player-controls.component.html",
    styleUrl: "./video-player-controls.component.css",
})
export class VideoPlayerControlsComponent {
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


    togglePlayPause() {
        const video = this.videoPlayer.nativeElement;
        if (video.paused) {
            video.play();
            this.isPlaying = true;
        } else {
            video.pause();
            this.isPlaying = false;
        }
    }

    toggleMute() {
        const video = this.videoPlayer.nativeElement;
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.volume = 0;
            video.volume = 0;
        } else {
            this.volume = 0.5; // default unmute volume
            video.volume = this.volume;
        }
    }

    progressForward() {
        this.videoPlayer.nativeElement.currentTime += 5;
        this.currentTime = this.videoPlayer.nativeElement.currentTime;
        this.updateProgress();
    }

    progressBackward() {
        this.videoPlayer.nativeElement.currentTime -= 5;
        this.currentTime = this.videoPlayer.nativeElement.currentTime;
        this.updateProgress();
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
        const video = this.videoPlayer.nativeElement;
        const input = event.target as HTMLInputElement;
        const volumeValue = Number(input.value);

        video.volume = volumeValue;
        this.volume = volumeValue;
        this.isMuted = volumeValue === 0;
    }

    setDuration() {
        const video = this.videoPlayer.nativeElement;
        this.duration = video.duration;
    }

    goFullScreen() {
        const video = this.videoPlayer.nativeElement;
        if (video.requestFullscreen) {
            video.requestFullscreen();
            this.isFullScreen = true;
        } else if ((video as any).webkitRequestFullscreen) { // Safari
            (video as any).webkitRequestFullscreen();
            this.isFullScreen = true;
        } else if ((video as any).msRequestFullscreen) { // IE11
            (video as any).msRequestFullscreen();
            this.isFullScreen = true;
        }
    }
    
    exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            this.isFullScreen = false;
        }
    }      

    updateProgress() {
        const video = this.videoPlayer.nativeElement;
        this.currentTime = video.currentTime;
    }

    seekVideo(event: Event) {
        const video = this.videoPlayer.nativeElement;
        const input = event.target as HTMLInputElement;
        video.currentTime = Number(input.value);
        this.currentTime = Number(input.value);
    }
}
