import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStreamComponent } from './video-stream.component';

describe('VideoStreamComponent', () => {
  let component: VideoStreamComponent;
  let fixture: ComponentFixture<VideoStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoStreamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
