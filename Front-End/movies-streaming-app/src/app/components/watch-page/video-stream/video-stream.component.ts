import { Component, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { VideoPlayerControlsComponent } from "../video-player-controls/video-player-controls.component";
@Component({
  selector: 'app-video-stream',
  imports: [NgClass, VideoPlayerControlsComponent],
  templateUrl: './video-stream.component.html',
  styleUrl: './video-stream.component.css'
})
export class VideoStreamComponent {
    
    IsSidebarOpen : boolean = false;
    IsPremiumUser : boolean = false;
    ISHD : boolean = false; 
    @Output() emitToggleSidebarValue = new EventEmitter<boolean>();

    toogleSideBar(){
        this.IsSidebarOpen = !this.IsSidebarOpen;
        this.sendToogleSidebarStatus();
        console.log(this.IsSidebarOpen);
    }
    
    sendToogleSidebarStatus(){
        this.emitToggleSidebarValue.emit(this.IsSidebarOpen);
    }

}
