import { Injectable } from '@angular/core';
import { MovieReview } from '../models/review';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieReviewsService {

  allMovieReviews: MovieReview[] = [];
  public movieReviewsChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  /** Create Review */
  createReview(data:any): void {
    let reviewID = this.allMovieReviews.length+1;
    let review = data;
    review.reviewId = reviewID
    this.allMovieReviews.push(review);
    this.movieReviewsChanged.next(true);
  }

  /** Get all Reviews */
  getReviews() {
    return this.allMovieReviews;
  }

  /** Get Review based off movie id*/
  getReview(id:number): MovieReview {
    for(let i=0; i<this.allMovieReviews.length; i++) {
      if(this.allMovieReviews[i].movieId == id) {
        return this.allMovieReviews[i];
      }
    }
    return new MovieReview(0,"",0);
  }

  /** Update Review */
  editReview(id:number, newRating: number, newReview: string): void {
    for(let i=0; i<this.allMovieReviews.length; i++) {
      if(this.allMovieReviews[i].movieId == id) {
        this.allMovieReviews[i].rating = newRating;
        this.allMovieReviews[i].review = newReview;
      }
    }
    this.movieReviewsChanged.next(true);
  }

  /** Delete Review */
  deleteReview(id:number): void {
    for(let i=0; i<this.allMovieReviews.length; i++) {
      if(this.allMovieReviews[i].movieId == id) {
        this.allMovieReviews.splice(i, 1);
      }
    }
    this.movieReviewsChanged.next(true);
  }

}
