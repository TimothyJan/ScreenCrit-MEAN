import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private url = 'http://localhost:5200';
  tvReviews$ = signal<Review[]>([]);
  movieReviews$ = signal<Review[]>([]);
  review$ = signal<Review>({} as Review);

  constructor(private httpClient: HttpClient) { }

  /** Refresh Movie Reviews */
  refreshMovieReviews() {
    this.httpClient.get<Review[]>(`${this.url}/movie-reviews`)
      .subscribe(reviews => {
        this.movieReviews$.set(reviews);
      }
    );
  }

  /** Refresh TV Reviews */
  refreshTVReviews() {
    this.httpClient.get<Review[]>(`${this.url}/tv-reviews`)
      .subscribe(reviews => {
        this.tvReviews$.set(reviews);
      }
    );
  }

  /** Get Movie Reviews */
  getMovieReviews() {
    this.refreshMovieReviews();
    return this.movieReviews$();
  }

  /** Get TV Reviews */
  getTVReviews() {
    this.refreshTVReviews();
    return this.tvReviews$();
  }

  /** Get Movie Review with input id */
  getMovieReview(id: string): Observable<Review> {
    return this.httpClient.get<Review>(`${this.url}/movie-reviews/${id}`);
  }

  /** Get TV Review with input id */
  getTVReview(id: string): Observable<Review> {
    return this.httpClient.get<Review>(`${this.url}/tv-reviews/${id}`);
  }

  /** Create Movie Review with input review */
  createMovieReview(review: Review) {
    return this.httpClient.post(`${this.url}/movie-reviews`, review, { responseType: 'text' });
  }

  /** Create TV Review with input review */
  createTVReview(review: Review) {
    return this.httpClient.post(`${this.url}/tv-reviews`, review, { responseType: 'text' });
  }

  /** Update Movie Review with input id and input review */
  updateMovieReview(id: string, review: Review) {
    return this.httpClient.put(`${this.url}/movie-reviews/${id}`, review, { responseType: 'text' });
  }

  /** Update TV Review with input id and input review */
  updateTVReview(id: string, review: Review) {
    return this.httpClient.put(`${this.url}/tv-reviews/${id}`, review, { responseType: 'text' });
  }

  /** Delete Movie Review with input id */
  deleteMovieReview(id: string) {
    return this.httpClient.delete(`${this.url}/movie-reviews/${id}`, { responseType: 'text' });
  }

  /** Delete TV Review with input id */
  deleteTVReview(id: string) {
    return this.httpClient.delete(`${this.url}/tv-reviews/${id}`, { responseType: 'text' });
  }
}
