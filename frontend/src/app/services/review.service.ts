import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private url = 'http://localhost:5200';
  reviews$ = signal<Review[]>([]);
  review$ = signal<Review>({} as Review);

  constructor(private httpClient: HttpClient) { }

  private refreshReviews() {
    this.httpClient.get<Review[]>(`${this.url}/reviews`)
      .subscribe(reviews => {
        this.reviews$.set(reviews);
      });
  }

  getReviews() {
    this.refreshReviews();
    return this.reviews$();
  }

  getReview(id: string) {
    this.httpClient.get<Review>(`${this.url}/reviews/${id}`)
    .subscribe(review => {
      this.review$.set(review);
      return this.review$();
    });
  }

  createReview(review: Review) {
    return this.httpClient.post(`${this.url}/reviews`, review, { responseType: 'text' });
  }

  updateReview(id: string, review: Review) {
    return this.httpClient.put(`${this.url}/reviews/${id}`, review, { responseType: 'text' });
  }

  deleteReview(id: string) {
    return this.httpClient.delete(`${this.url}/reviews/${id}`, { responseType: 'text' });
  }
}
