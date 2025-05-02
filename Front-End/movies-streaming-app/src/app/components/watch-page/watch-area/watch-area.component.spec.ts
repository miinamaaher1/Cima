import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchAreaComponent } from './watch-area.component';

describe('WatchAreaComponent', () => {
  let component: WatchAreaComponent;
  let fixture: ComponentFixture<WatchAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
