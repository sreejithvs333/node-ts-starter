import express from "express";
import { Request, Response } from "express";
import { FeedService } from "../services/feeds.service";
import Feed from "../models/feed.model";

const feeds = express.Router();

feeds.get("/", async (req: Request, res: Response) => {
  const feedService = new FeedService();
  try {
    const result = await feedService.index();
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json(err);
    }
  }
});

feeds.get("/:id", async (req: Request, res: Response) => {
  const feedService = new FeedService();
  try {
    const { id } = req.query;
    const result = await feedService.read(id as unknown as number);
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json(err);
    }
  }
});

feeds.post("/", async (req: Request, res: Response) => {
  const feedService = new FeedService();
  const feed: Feed = {
    title: req.body.title,
    description: req.body.description
  };
  try {
    const result = await feedService.create(feed);
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json(err);
    }
  }
});

feeds.put("/:id", async (req: Request, res: Response) => {
  const feedService = new FeedService();
  try {
    const feed: Feed = req.body;
    const fieldsToUpdate: (keyof Feed)[] = Object.keys(feed) as (keyof Feed)[];
    const updatedFeed = await feedService.update(feed, fieldsToUpdate);
    return res.status(200).json(updatedFeed);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json(err);
    }
  }
});

feeds.delete("/:id", async (req: Request, res: Response) => {
  const feedService = new FeedService();
  try {
    const { id } = req.query;
    const result = await feedService.delete(id as unknown as number);
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json(err);
    }
  }
});

export default feeds;
