import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private url = 'http://localhost:5200';
  employees$ = signal<Review[]>([]);
  employee$ = signal<Review>({} as Review);

  constructor(private httpClient: HttpClient) { }

  private refreshReviews() {
    this.httpClient.get<Review[]>(`${this.url}/employees`)
      .subscribe(employees => {
        this.employees$.set(employees);
      });
  }

  getReviews() {
    this.refreshReviews();
    return this.employees$();
  }

  getReview(id: string) {
    this.httpClient.get<Review>(`${this.url}/employees/${id}`).subscribe(employee => {
      this.employee$.set(employee);
      return this.employee$();
    });
  }

  createReview(employee: Review) {
    return this.httpClient.post(`${this.url}/employees`, employee, { responseType: 'text' });
  }

  updateReview(id: string, employee: Review) {
    return this.httpClient.put(`${this.url}/employees/${id}`, employee, { responseType: 'text' });
  }

  deleteReview(id: string) {
    return this.httpClient.delete(`${this.url}/employees/${id}`, { responseType: 'text' });
  }
}
