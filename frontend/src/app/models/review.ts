export class Review {
  rating: number;
  review: string;
  _id?: number;
  movieId?: number;
  tvSeriesId?: number;
  constructor(rating:number, review: string, _id?: number, movieId?: number, tvSeriesId?: number) {
    this.rating = rating;
    this.review = review;
    this._id = _id;
    this.movieId = movieId;
    this.tvSeriesId = tvSeriesId;
  }
}
