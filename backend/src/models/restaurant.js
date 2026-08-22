import { pool } from "../config/db.js";

// Get all restaurants
export const getAllRestaurants = async () => {
  const result = await pool.query(`
    SELECT
      id,
      owner_id AS owner,
      name,
      cuisine,
      rating,
      delivery_time AS "deliveryTime",
      price,
      image,
      discount,
      description,
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    FROM restaurants
    ORDER BY id
  `);

  return result.rows;
};

// Get restaurant by ID
export const getRestaurantById = async (id) => {
  const result = await pool.query(
    `
    SELECT
      id,
      owner_id AS owner,
      name,
      cuisine,
      rating,
      delivery_time AS "deliveryTime",
      price,
      image,
      discount,
      description,
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    FROM restaurants
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

// Create restaurant
export const createRestaurant = async (
  id,
  ownerId,
  name,
  cuisine,
  rating,
  deliveryTime,
  price,
  image,
  discount,
  description
) => {
  const result = await pool.query(
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
    RETURNING
      id,
      owner_id AS owner,
      name,
      cuisine,
      rating,
      delivery_time AS "deliveryTime",
      price,
      image,
      discount,
      description,
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    `,
    [
      id,
      ownerId,
      name,
      cuisine,
      rating,
      deliveryTime,
      price,
      image,
      discount,
      description,
    ]
  );

  return result.rows[0];
};

// Update restaurant
export const updateRestaurant = async (
  id,
  name,
  cuisine,
  rating,
  deliveryTime,
  price,
  image,
  discount,
  description
) => {
  const result = await pool.query(
    `
    UPDATE restaurants
    SET
      name = $2,
      cuisine = $3,
      rating = $4,
      delivery_time = $5,
      price = $6,
      image = $7,
      discount = $8,
      description = $9,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING
      id,
      owner_id AS owner,
      name,
      cuisine,
      rating,
      delivery_time AS "deliveryTime",
      price,
      image,
      discount,
      description,
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    `,
    [
      id,
      name,
      cuisine,
      rating,
      deliveryTime,
      price,
      image,
      discount,
      description,
    ]
  );

  return result.rows[0];
};

// Delete restaurant
export const deleteRestaurant = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM restaurants
    WHERE id = $1
    RETURNING id
    `,
    [id]
  );

  return result.rows[0];
};