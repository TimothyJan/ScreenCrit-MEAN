export class Review {
  category: "MOVIES" | "TVSERIES";
  rating: number;
  review: string;
  tmdbId: number;
  _id?: number;

  constructor(category: "MOVIES" | "TVSERIES", rating: number, review: string, tmdbId: number, _id?: number) {
    this.category = category;
    this.rating = rating;
    this.review = review;
    this.tmdbId = tmdbId;
    this._id = _id;
  }
}
