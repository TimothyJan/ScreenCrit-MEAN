import * as mongodb from "mongodb";

export interface Review {
    rating: number;
    review: string;
    category: "movie" | "tvseries";
    categoryId: number;
    _id?: mongodb.ObjectId;
}