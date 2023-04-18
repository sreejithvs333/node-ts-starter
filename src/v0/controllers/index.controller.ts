import express from "express";
import feeds from "./feeds.controller";
const v0routes = express.Router();

v0routes.use("/feeds", feeds);

export default v0routes;
