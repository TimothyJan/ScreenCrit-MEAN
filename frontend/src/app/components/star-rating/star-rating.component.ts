import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent implements OnInit, OnChanges {
  @Input() rating: number;
  @Input() canEditRating: boolean = false;
  @Output() ratingChange = new EventEmitter<number>();

  currentRating: number;
  stars: number[];

  constructor() {
    this.stars = Array(5).fill(0).map((_, i) => i + 1);
  }

  ngOnInit() {
    this.resetStars();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentRating = this.rating;
  }

  /** Highlight from mouse event*/
  highlightStar(event: MouseEvent) {
    const dataValue = (event.target as HTMLElement).getAttribute('data-value');
    if (dataValue !== null) {
      const starValue = parseInt(dataValue, 10);
      this.currentRating = starValue;
    }
  }

  /** Resets star highlights */
  resetStars() {
    this.currentRating = this.rating;
  }

  /** Emits rating value to item-dialog component */
  rate(event: MouseEvent) {
    const dataValue = (event.target as HTMLElement).getAttribute('data-value');
    if (dataValue !== null) {
      const starValue = parseInt(dataValue, 10);
      this.rating = starValue;
      this.ratingChange.emit(starValue);
    }
  }
}
