import express from "express";
const feeds = express.Router();

// returns hello!
feeds.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("Hello!");
});

export default feeds;