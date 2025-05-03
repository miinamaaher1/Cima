import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribePageCardsComponent } from './subscribe-page-cards.component';

describe('SubscribePageCardsComponent', () => {
  let component: SubscribePageCardsComponent;
  let fixture: ComponentFixture<SubscribePageCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribePageCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribePageCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
