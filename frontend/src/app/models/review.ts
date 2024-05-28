export class Review {
  rating: number;
  review: string;
  _id?: number;
  constructor(rating:number, review: string, _id?: number) {
    this.rating = rating;
    this.review = review;
    this._id = _id;
  }
}

export class MovieReview extends Review {
  movieId: number;
}

export class TVSeriesReview extends Review {
  tvSeriesId: number;
}
