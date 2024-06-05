import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
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
export class CarouselReviewComponent implements OnInit{

  @Input() movieOrTvSeries: string = "";

  reviews$ = {} as WritableSignal<Review[]>;

  title:string = ""
  currentIndex = 0;
  itemWidth = 300; // Adjust as needed
  offsetX = 10;

  loadingData: boolean = true;

  constructor(
    private _tmdbService: TmdbService,
    private _reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.loadingData = true;
    this.setTitle();
    this.fetchReviews();
  }

  /** When query search is changed, carousel item list is reset */
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.setItems();
  // }

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
    this._reviewService.deleteReview(id).subscribe({
      next: () => this.fetchReviews(),
    });
  }

  private fetchReviews(): void {
    this.reviews$ = this._reviewService.reviews$;
    this._reviewService.getReviews();
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
