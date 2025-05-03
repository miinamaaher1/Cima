import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribePageFAQComponent } from './subscribe-page-faq.component';

describe('SubscribePageFAQComponent', () => {
  let component: SubscribePageFAQComponent;
  let fixture: ComponentFixture<SubscribePageFAQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribePageFAQComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribePageFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
