import { TestBed } from '@angular/core/testing';

import { TvseriesReviewsService } from './tvseries-reviews.service';

describe('TvseriesReviewsService', () => {
  let service: TvseriesReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvseriesReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
