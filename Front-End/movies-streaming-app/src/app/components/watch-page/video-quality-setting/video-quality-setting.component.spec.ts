import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoQualitySettingComponent } from './video-quality-setting.component';

describe('VideoQualitySettingComponent', () => {
  let component: VideoQualitySettingComponent;
  let fixture: ComponentFixture<VideoQualitySettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoQualitySettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoQualitySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
