import express from "express";
import cors from "cors";
import helmet from "helmet";

import restaurantRoutes from "./routes/restaurantRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import logger from "./middleware/logger.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());

//Your API accepts cross-origin browser requests broadly.
//Its convenient during development, but for production we should restrict it to your frontend.
app.use(cors());

//app.use(cors({origin: process.env.FRONTEND_URL,}));

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
  res.send("Foodpanda Backend is running!");
});

app.use("/api/restaurants", restaurantRoutes);

app.use("/api/auth", authRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;