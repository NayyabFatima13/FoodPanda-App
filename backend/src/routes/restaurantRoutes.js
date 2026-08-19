import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/", getRestaurants);

router.get("/:id", getRestaurantById);

router.post("/", authMiddleware, createRestaurant);

router.put("/:id", authMiddleware, updateRestaurant);

router.delete("/:id", authMiddleware, deleteRestaurant);

export default router;