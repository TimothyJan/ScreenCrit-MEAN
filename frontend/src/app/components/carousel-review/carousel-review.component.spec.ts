import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselReviewComponent } from './carousel-review.component';

describe('CarouselReviewComponent', () => {
  let component: CarouselReviewComponent;
  let fixture: ComponentFixture<CarouselReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
