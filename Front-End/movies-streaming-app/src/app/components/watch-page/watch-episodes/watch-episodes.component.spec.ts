import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchEpisodesComponent } from './watch-episodes.component';

describe('WatchEpisodesComponent', () => {
  let component: WatchEpisodesComponent;
  let fixture: ComponentFixture<WatchEpisodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchEpisodesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchEpisodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
