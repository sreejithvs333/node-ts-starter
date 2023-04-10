import express from "express";
import feeds from "./feed/feeds.router";
const v0routes = express.Router();

v0routes.use("/feeds", feeds);

export default v0routes;