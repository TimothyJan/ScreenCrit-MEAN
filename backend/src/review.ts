import * as mongodb from "mongodb";

export interface Review {
    category: "movie" | "tvseries";
    rating: number;
    review: string;
    tmdbId: number;
    _id?: mongodb.ObjectId;
}