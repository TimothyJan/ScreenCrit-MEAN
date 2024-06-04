import { Component } from '@angular/core';
import { CarouselReviewComponent } from '../../carousel-review/carousel-review.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CarouselReviewComponent
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

}
