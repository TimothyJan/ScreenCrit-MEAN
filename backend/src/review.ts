import * as mongodb from "mongodb";

export interface Review {
    category: "MOVIES" | "TVSERIES";
    rating: number;
    review: string;
    tmdbId: number;
    _id?: mongodb.ObjectId;
}