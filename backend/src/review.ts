import * as mongodb from "mongodb";

export interface Review {
    rating: number;
    review: string;
    movieId?: number;
    tvSeriesId?: number;
    _id?: mongodb.ObjectId;
}