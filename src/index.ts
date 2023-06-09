import express from "express";
import routes from "./index.controller";
import cors from "cors";
const app = express();
const port = 3000;
import loggerMiddleware from "./v0/middlewares/request-logger.mw";
const corsOptions: cors.CorsOptions = {
  // white listing all domain. Replace it with client domain
  origin: "*",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(loggerMiddleware);
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server started and running on http://localhost:${port}`);
});

export default app;
