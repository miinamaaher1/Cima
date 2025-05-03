import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribePageHeaderComponent } from './subscribe-page-header.component';

describe('SubscribePageHeaderComponent', () => {
  let component: SubscribePageHeaderComponent;
  let fixture: ComponentFixture<SubscribePageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribePageHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribePageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
