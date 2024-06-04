import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { ReviewService } from '../../services/review.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { CarouselReviewItemComponent } from './carousel-review-item/carousel-review-item.component';
import { CommonModule } from '@angular/common';


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
export class CarouselReviewComponent implements OnInit, OnChanges{

  @Input() movieOrTvSeries: string = "";

  title:string = ""
  items: number[] = [];
  currentIndex = 0;
  itemWidth = 300; // Adjust as needed
  offsetX = 10;

  loadingData: boolean = true;

  constructor(
    private _tmdbService: TmdbService,
    private _reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.setTitle();
    this.setItems();
  }

  /** When query search is changed, carousel item list is reset */
  ngOnChanges(changes: SimpleChanges): void {
    this.setItems();
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

  /** Reset item list first, then gets and sets list of items to be displayed */
  setItems(): void {
    this.items = []
    this.loadingData = true;
    switch(this.movieOrTvSeries) {
      case "MOVIES": {
        let reviews = this._reviewService.getReviews();
        console.log(reviews);
        /*
        INCOMPLETE
        for(let index=0; index<reviews.length; index++) {
          this.items.push(reviews[index].movieId);
        }
        */
        this.loadingData = false;
        break;
      }
      case "TVSERIES": {
        let reviews = this._reviewService.getReviews();
        console.log(reviews);
        /*
        INCOMPLETE
        for(let index=0; index<reviews.length; index++) {
          this.items.push(reviews[index].tvSeriesId);
        }
        */
        this.loadingData = false;
        break;
      }
      default:
        console.log("Issue with datalisttype");
        break;
    }
  }

  /** Moves carousel to next index */
  next(): void {
    if (this.currentIndex < this.items.length - 1) {
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
    return this.currentIndex >= this.items.length - 10;
  }
}
