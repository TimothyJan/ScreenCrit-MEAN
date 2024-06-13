import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private url = 'http://localhost:5200';
  tvReviews$ = signal<Review[]>([]);
  movieReviews$ = signal<Review[]>([]);
  review$ = signal<Review>({} as Review);

  constructor(private httpClient: HttpClient) { }

  private refreshTVReviews() {
    this.httpClient.get<Review[]>(`${this.url}/tv-reviews`)
      .subscribe(reviews => {
        this.tvReviews$.set(reviews);
      });
  }

  private refreshMovieReviews() {
    this.httpClient.get<Review[]>(`${this.url}/movie-reviews`)
      .subscribe(reviews => {
        this.movieReviews$.set(reviews);
      });
  }

  getTVReviews() {
    this.refreshTVReviews();
    return this.tvReviews$();
  }

  getMovieReviews() {
    this.refreshMovieReviews();
    return this.movieReviews$();
  }

  getTVReview(id: string) {
    this.httpClient.get<Review>(`${this.url}/tv-reviews/${id}`)
    .subscribe(review => {
      this.review$.set(review);
      return this.review$();
    });
  }

  getMovieReview(id: string) {
    this.httpClient.get<Review>(`${this.url}/movie-reviews/${id}`)
    .subscribe(review => {
      this.review$.set(review);
      return this.review$();
    });
  }

  createTVReview(review: Review) {
    return this.httpClient.post(`${this.url}/tv-reviews`, review, { responseType: 'text' });
  }

  createMovieReview(review: Review) {
    return this.httpClient.post(`${this.url}/movie-reviews`, review, { responseType: 'text' });
  }

  updateTVReview(id: string, review: Review) {
    return this.httpClient.put(`${this.url}/tv-reviews/${id}`, review, { responseType: 'text' });
  }

  updateMovieReview(id: string, review: Review) {
    return this.httpClient.put(`${this.url}/movie-reviews/${id}`, review, { responseType: 'text' });
  }

  deleteTVReview(id: string) {
    return this.httpClient.delete(`${this.url}/tv-reviews/${id}`, { responseType: 'text' });
  }

  deleteMovieReview(id: string) {
    return this.httpClient.delete(`${this.url}/movie-reviews/${id}`, { responseType: 'text' });
  }
}
