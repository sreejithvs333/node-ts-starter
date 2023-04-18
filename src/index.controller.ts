import v0routes from "./v0/controllers/index.controller";
import express from "express";
const routes = express.Router();

routes.use("/v0", v0routes);

export default routes;
