import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitWatchPageComponent } from './limit-watch-page.component';

describe('LimitWatchPageComponent', () => {
  let component: LimitWatchPageComponent;
  let fixture: ComponentFixture<LimitWatchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimitWatchPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimitWatchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
