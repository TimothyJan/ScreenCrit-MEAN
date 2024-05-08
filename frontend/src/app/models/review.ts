export class Review {
  reviewId: number;
  rating: number;
  review: string;
  constructor(reviewId:number, rating:number, review: string) {
    this.reviewId = reviewId;
    this.rating = rating;
    this.review = review;
  }
}

export class MovieReview extends Review {
  movieId: number;
}

export class TVSeriesReview extends Review {
  tvSeriesId: number;
}
