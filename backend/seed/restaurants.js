import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { pool } from "../src/config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedRestaurants = async () => {
  try {
    const ownerId = Number(process.env.SEED_OWNER_ID);

    if (!Number.isInteger(ownerId)) {
      throw new Error(
        "SEED_OWNER_ID must be a valid user ID"
      );
    }

    // Check that the owner exists
    const userResult = await pool.query(
      `SELECT id FROM users WHERE id = $1`,
      [ownerId]
    );

    if (userResult.rows.length === 0) {
      throw new Error(
        `User with ID ${ownerId} does not exist. Create a user first.`
      );
    }

    console.log("PostgreSQL connected");

    // Read restaurants.json
    const filePath = path.join(
      __dirname,
      "restaurants.json"
    );

    const fileData = fs.readFileSync(
      filePath,
      "utf-8"
    );

    const data = JSON.parse(fileData);

    const restaurants = data.restaurants;

    // Remove existing restaurants
    await pool.query("DELETE FROM restaurants");

    // Insert restaurants
    for (const restaurant of restaurants) {
      await pool.query(
        `
        INSERT INTO restaurants (
          id,
          owner_id,
          name,
          cuisine,
          rating,
          delivery_time,
          price,
          image,
          discount,
          description
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `,
        [
          restaurant.id,
          ownerId,
          restaurant.name,
          restaurant.cuisine,
          restaurant.rating,
          restaurant.deliveryTime,
          restaurant.price,
          restaurant.image,
          restaurant.discount,
          restaurant.description,
        ]
      );
    }

    console.log(
      `${restaurants.length} restaurants inserted successfully`
    );

    await pool.end();

    console.log("PostgreSQL connection closed");
  } catch (error) {
    console.error(
      "Seeding failed:",
      error.message
    );

    await pool.end();

    process.exit(1);
  }
};

seedRestaurants();