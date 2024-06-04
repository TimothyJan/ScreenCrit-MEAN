import * as mongodb from "mongodb";
import { Review } from "./review";

export const collections: {
    reviews?: mongodb.Collection<Review>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("Reviews");
    await applySchemaValidation(db);

    const reviewsCollection = db.collection<Review>("Reviews");
    collections.reviews = reviewsCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["rating", "review"],
            additionalProperties: false,
            properties: {
                _id: {},
                rating: {
                    bsonType: "number",
                    description: "'rating' is required and is a number",
                },
                review: {
                    bsonType: "string",
                    description: "'review' is required and is a string",
                    minLength: 1
                },
            },
        },
    };

  // Try applying the modification to the collection, if the collection doesn't exist, create it
   await db.command({
        collMod: "reviews",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("reviews", {validator: jsonSchema});
        }
    });
}