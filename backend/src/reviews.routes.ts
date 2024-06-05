import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const reviewRouter = express.Router();
reviewRouter.use(express.json());

reviewRouter.get("/", async (_req, res) => {
    try {
        const reviews = await collections?.reviews?.find({}).toArray();
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

reviewRouter.get("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const review = await collections?.reviews?.findOne(query);

    if (review) {
        res.status(200).send(review);
    } else {
        res.status(404).send(`Failed to find an review: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find an review: ID ${req?.params?.id}`);
  }
});

reviewRouter.post("/", async (req, res) => {
  try {
    const review = req.body;
    const result = await collections?.reviews?.insertOne(review);

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

reviewRouter.put("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const review = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.reviews?.updateOne(query, { $set: review });

    if (result && result.matchedCount) {
        res.status(200).send(`Updated an review: ID ${id}.`);
    } else if (!result?.matchedCount) {
        res.status(404).send(`Failed to find an review: ID ${id}`);
    } else {
        res.status(304).send(`Failed to update an review: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
});

reviewRouter.delete("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.reviews?.deleteOne(query);

    if (result && result.deletedCount) {
        res.status(202).send(`Removed an review: ID ${id}`);
    } else if (!result) {
        res.status(400).send(`Failed to remove an review: ID ${id}`);
    } else if (!result.deletedCount) {
        res.status(404).send(`Failed to find an review: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
});