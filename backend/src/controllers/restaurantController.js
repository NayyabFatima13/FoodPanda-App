import {
  getAllRestaurants,
  getRestaurantById as findRestaurantById,
  createRestaurant as insertRestaurant,
  updateRestaurant as updateRestaurantById,
  deleteRestaurant as deleteRestaurantById,
} from "../models/restaurant.js";

// ======================================
// GET ALL RESTAURANTS
// ======================================

export const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await getAllRestaurants();

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================
// GET RESTAURANT BY ID
// ======================================

export const getRestaurantById = async (req, res, next) => {
  try {
    const restaurantId = Number(req.params.id);

    if (!Number.isInteger(restaurantId)) {
      return res.status(400).json({
        success: false,
        message: "Restaurant ID must be a valid number",
      });
    }

    const restaurant =
      await findRestaurantById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================
// CREATE RESTAURANT
// ======================================

export const createRestaurant = async (req, res, next) => {
  try {
    const {
      id,
      name,
      cuisine,
      rating,
      deliveryTime,
      price,
      image,
      discount,
      description,
    } = req.body;

    const restaurant = await insertRestaurant(
      id,
      req.user.userId,
      name,
      cuisine,
      rating,
      deliveryTime,
      price,
      image,
      discount,
      description
    );

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================
// UPDATE RESTAURANT
// ======================================

export const updateRestaurant = async (req, res, next) => {
  try {
    const restaurantId = Number(req.params.id);

    if (!Number.isInteger(restaurantId)) {
      return res.status(400).json({
        success: false,
        message: "Restaurant ID must be a valid number",
      });
    }

    const restaurant =
      await findRestaurantById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Ownership check
    if (
      String(restaurant.owner) !==
      String(req.user.userId)
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to update this restaurant",
      });
    }

    const {
      name,
      cuisine,
      rating,
      deliveryTime,
      price,
      image,
      discount,
      description,
    } = req.body;

    const updatedRestaurant =
      await updateRestaurantById(
        restaurantId,
        name,
        cuisine,
        rating,
        deliveryTime,
        price,
        image,
        discount,
        description
      );

    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      data: updatedRestaurant,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================
// DELETE RESTAURANT
// ======================================

export const deleteRestaurant = async (req, res, next) => {
  try {
    const restaurantId = Number(req.params.id);

    if (!Number.isInteger(restaurantId)) {
      return res.status(400).json({
        success: false,
        message: "Restaurant ID must be a valid number",
      });
    }

    const restaurant =
      await findRestaurantById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Ownership check
    if (
      String(restaurant.owner) !==
      String(req.user.userId)
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to delete this restaurant",
      });
    }

    await deleteRestaurantById(restaurantId);

    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};