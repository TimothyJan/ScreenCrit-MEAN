import { Injectable } from '@angular/core';
import { TVSeriesReview } from '../models/review';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TVseriesReviewsService {

  allTVSeriesReviews: TVSeriesReview[] = [];
  public tvSeriesReviewsChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  /** Create Review */
  createReview(data:any): void {
    let reviewID = this.allTVSeriesReviews.length+1;
    let review = data;
    review.reviewId = reviewID
    this.allTVSeriesReviews.push(review);
    this.tvSeriesReviewsChanged.next(true);
  }

  /** Get all Reviews */
  getReviews() {
    return this.allTVSeriesReviews;
  }

  /** Get Review based off tvseries id*/
  getReview(id:number): TVSeriesReview {
    for(let i=0; i<this.allTVSeriesReviews.length; i++) {
      if(this.allTVSeriesReviews[i].tvSeriesId == id) {
        return this.allTVSeriesReviews[i];
      }
    }
    return new TVSeriesReview(0,0,"");
  }

  /** Update Review */
  editReview(id:number, newRating: number, newReview: string): void {
    for(let i=0; i<this.allTVSeriesReviews.length; i++) {
      if(this.allTVSeriesReviews[i].tvSeriesId == id) {
        this.allTVSeriesReviews[i].rating = newRating;
        this.allTVSeriesReviews[i].review = newReview;
      }
    }
    this.tvSeriesReviewsChanged.next(true);
  }

  /** Delete Review */
  deleteReview(id:number): void {
    for(let i=0; i<this.allTVSeriesReviews.length; i++) {
      if(this.allTVSeriesReviews[i].tvSeriesId == id) {
        this.allTVSeriesReviews.splice(i,1);
      }
    }
    this.tvSeriesReviewsChanged.next(true);
  }
}
