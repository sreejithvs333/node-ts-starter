import express from "express";
import { FeedStore } from "./models/feed";
const feeds = express.Router();
const { POSTGRES_PASSWORD } = process.env;

feeds.get("/", async (req: express.Request, res: express.Response) => {
  const store = new FeedStore();
  try {
    const result = await store.index();
    res.status(200).send(result);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    } else {
      res.status(400).send(String(err));
    }
  }
});

export default feeds;
