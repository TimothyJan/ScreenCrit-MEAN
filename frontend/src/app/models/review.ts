export class Review {
  rating: number;
  review: string;
  category: "movie" | "tvseries";
  categoryId: number;
  _id?: number;

  constructor(rating: number, review: string, category: "movie" | "tvseries", categoryId: number, _id?: number) {
    this.rating = rating;
    this.review = review;
    this.category = category;
    this.categoryId = categoryId;
    this._id = _id;
  }
}
