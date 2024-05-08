import { TestBed } from '@angular/core/testing';

import { MovieReviewsService } from './movie-reviews.service';

describe('MovieReviewsService', () => {
  let service: MovieReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
