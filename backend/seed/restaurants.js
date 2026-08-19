import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import Restaurant from "../src/models/restaurant.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedRestaurants = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const filePath = path.join(__dirname, "restaurants.json");

    const fileData = fs.readFileSync(filePath, "utf-8");

    const data = JSON.parse(fileData);

    const restaurants = data.restaurants;

    await Restaurant.deleteMany();

    await Restaurant.insertMany(restaurants);

    console.log(
      `${restaurants.length} restaurants inserted successfully`
    );

    await mongoose.connection.close();

    console.log("MongoDB connection closed");

  } catch (error) {
    console.error("Seeding failed:", error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedRestaurants();