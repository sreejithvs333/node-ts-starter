import express from "express";
import { Request, Response } from "express";
import { Feed, FeedStore } from "./models/feed";
const feeds = express.Router();

feeds.get("/", async (req: Request, res: Response) => {
  const store = new FeedStore();
  try {
    const result = await store.index();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

feeds.get("/:id", async (req: Request, res: Response) => {
  const store = new FeedStore();
  try {
    const { id } = req.query;
    const result = await store.read(id as unknown as number);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

feeds.post("/", async (req: Request, res: Response) => {
  const store = new FeedStore();
  const feed: Feed = {
    title: req.body.title,
    description: req.body.description
  };
  try {
    const result = await store.create(feed);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

feeds.put("/:id", async (req: Request, res: Response) => {
  const store = new FeedStore();
  try {
    const feed: Feed = req.body;
    const fieldsToUpdate: (keyof Feed)[] = Object.keys(feed) as (keyof Feed)[];
    const updatedFeed = await store.update(feed, fieldsToUpdate);
    return res.status(200).json(updatedFeed);
  } catch (err) {
    res.status(400).json(err);
  }
});

feeds.delete("/:id", async (req: Request, res: Response) => {
  const store = new FeedStore();
  try {
    const { id } = req.query;
    const result = await store.delete(id as unknown as number);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

export default feeds;
