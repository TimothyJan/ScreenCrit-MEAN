export class Review {
  category: "MOVIES" | "TVSERIES";
  rating: number;
  review: string;
  tmdbId: number;
  _id?: string;

  constructor(category: "MOVIES" | "TVSERIES", rating: number, review: string, tmdbId: number, _id?: string) {
    this.category = category;
    this.rating = rating;
    this.review = review;
    this.tmdbId = tmdbId;
    this._id = _id;
  }
}
