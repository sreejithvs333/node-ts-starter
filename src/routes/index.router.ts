import v0routes from "./api/v0/v0.router";
import express from "express";
const routes = express.Router();

routes.use("/v0", v0routes);

export default routes;
