import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-video-stream',
  imports: [],
  templateUrl: './video-stream.component.html',
  styleUrl: './video-stream.component.css'
})
export class VideoStreamComponent {
    
    IsSidebarOpen : boolean = false;

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
