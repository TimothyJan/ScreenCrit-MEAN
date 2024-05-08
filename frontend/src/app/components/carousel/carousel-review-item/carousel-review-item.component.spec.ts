import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselReviewItemComponent } from './carousel-review-item.component';

describe('CarouselReviewItemComponent', () => {
  let component: CarouselReviewItemComponent;
  let fixture: ComponentFixture<CarouselReviewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselReviewItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselReviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
