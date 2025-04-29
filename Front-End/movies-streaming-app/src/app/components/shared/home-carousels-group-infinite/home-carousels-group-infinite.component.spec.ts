import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarouselsGroupInfiniteComponent } from './home-carousels-group-infinite.component';

describe('HomeCarouselsGroupInfiniteComponent', () => {
  let component: HomeCarouselsGroupInfiniteComponent;
  let fixture: ComponentFixture<HomeCarouselsGroupInfiniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCarouselsGroupInfiniteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCarouselsGroupInfiniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
