import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-video-quality-setting',
  imports: [NgClass, NgIf],
  templateUrl: './video-quality-setting.component.html',
  styleUrl: './video-quality-setting.component.css'
})
export class VideoQualitySettingComponent {
    showQualityMenu : boolean = false;

    toggleQualitySettingMenu(){
        this.showQualityMenu = !this.showQualityMenu;
    }
    selectedQuality = 'Medium Quality';
  
  
    selectQuality(quality: string): void {
      if (quality !== 'Premium Quality') {
        this.selectedQuality = quality;
        this.showQualityMenu = false;
      }
    }
  
    showPremiumPrompt(): void {
      // This would show a premium subscription prompt in a real application
      alert('Premium subscription required to access this quality setting');
      this.showQualityMenu = false;
    }
}
