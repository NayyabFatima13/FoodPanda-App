import express from "express";
import cors from "cors";

import restaurantRoutes from "./routes/restaurantRoutes.js";
import logger from "./middleware/logger.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
  res.send("Foodpanda Backend is running!");
});

app.use("/api/restaurants", restaurantRoutes);

export default app;