import express from "express";
import feeds from "./feeds.controller";
import users from "./users.controller";
const v0routes = express.Router();

v0routes.use("/feeds", feeds);
v0routes.use("/users", users);

export default v0routes;
