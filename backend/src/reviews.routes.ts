import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const tvReviewRouter = express.Router();
export const movieReviewRouter = express.Router();

tvReviewRouter.use(express.json());
movieReviewRouter.use(express.json());

// TV Reviews Routes
tvReviewRouter.get("/", async (_req, res) => {
    try {
        const reviews = await collections?.tvReviews?.find({}).toArray();
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

tvReviewRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const review = await collections?.tvReviews?.findOne(query);

        if (review) {
            res.status(200).send(review);
        } else {
            res.status(404).send(`Failed to find a review: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find a review: ID ${req?.params?.id}`);
    }
});

tvReviewRouter.post("/", async (req, res) => {
    try {
        const review = req.body;
        const result = await collections?.tvReviews?.insertOne(review);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new review: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new review.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

tvReviewRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const review = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.tvReviews?.updateOne(query, { $set: review });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a review: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find a review: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a review: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

tvReviewRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.tvReviews?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a review: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a review: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a review: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

// Movie Reviews Routes
movieReviewRouter.get("/", async (_req, res) => {
    try {
        const reviews = await collections?.movieReviews?.find({}).toArray();
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

movieReviewRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const review = await collections?.movieReviews?.findOne(query);

        if (review) {
            res.status(200).send(review);
        } else {
            res.status(404).send(`Failed to find a review: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find a review: ID ${req?.params?.id}`);
    }
});

movieReviewRouter.post("/", async (req, res) => {
    try {
        const review = req.body;
        const result = await collections?.movieReviews?.insertOne(review);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new review: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new review.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

movieReviewRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const review = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.movieReviews?.updateOne(query, { $set: review });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a review: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find a review: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a review: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

movieReviewRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.movieReviews?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a review: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a review: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a review: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});
