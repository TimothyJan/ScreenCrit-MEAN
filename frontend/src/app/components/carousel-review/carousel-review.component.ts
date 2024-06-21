import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { CarouselReviewItemComponent } from './carousel-review-item/carousel-review-item.component';
import { CommonModule } from '@angular/common';
import { Review } from '../../models/review';


@Component({
  selector: 'app-carousel-review',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    CarouselReviewItemComponent
  ],
  templateUrl: './carousel-review.component.html',
  styleUrl: './carousel-review.component.css'
})
export class CarouselReviewComponent implements OnInit {

  @Input() movieOrTvSeries: string = "";

  reviews$ = {} as WritableSignal<Review[]>;

  title:string = ""
  currentIndex = 0;
  itemWidth = 300; // Adjust as needed
  offsetX = 10;

  loadingData: boolean = true;

  constructor(
    private _reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.loadingData = true;
    this.setTitle();
    this.fetchReviews();
  }

  /** Sets Title or Carousel */
  setTitle(): void {
    switch(this.movieOrTvSeries) {
      case "MOVIES": {
        this.title = "Movies";
        break;
      }
      case "TVSERIES": {
        this.title = "TV Shows";
        break;
      }
      default: {
        this.title = "Issue with Title ";
        break;
      }
    }
  }

  /** NOT USED YET */
  deleteReview(id: string): void {
    switch(this.movieOrTvSeries) {
      case "MOVIES": {
        this._reviewService.deleteMovieReview(id).subscribe({
          next: () => this.fetchReviews(),
        });
        break;
      }
      case "TVSERIES": {
        this._reviewService.deleteTVReview(id).subscribe({
          next: () => this.fetchReviews(),
        });
        break;
      }
      default: {
        this.title = "Issue with :" + this.movieOrTvSeries;
        break;
      }
    }
  }

  private fetchReviews(): void {
    switch(this.movieOrTvSeries) {
      case "MOVIES": {
        this.reviews$ = this._reviewService.movieReviews$;
        this._reviewService.getMovieReviews();
        break;
      }
      case "TVSERIES": {
        this.reviews$ = this._reviewService.tvReviews$;
        this._reviewService.getTVReviews();
        break;
      }
      default: {
        this.title = "Issue with Title ";
        break;
      }
    }
    this.loadingData = false;
  }

  /** Moves carousel to next index */
  next(): void {
    if (this.currentIndex < this.reviews$.length - 1) {
      this.currentIndex++;
      this.offsetX = -this.currentIndex * this.itemWidth;
    }
  }

  /** Moves carousel to previous index */
  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.offsetX = -this.currentIndex * this.itemWidth;
    }
  }

  /** Checks if last item in list of items */
  isLastItem(): boolean {
    return this.currentIndex >= this.reviews$.length - 10;
  }
}
