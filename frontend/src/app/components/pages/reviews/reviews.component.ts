import { Component } from '@angular/core';
import { CarouselComponent } from '../../carousel/carousel.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CarouselComponent
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

}
