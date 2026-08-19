import Restaurant from "../models/restaurant.js";

// Get Restaurants
export const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
};

// Get Restaurants by ID
export const getRestaurantById = async (req, res, next) => {
  try {
    const restaurantId = Number(req.params.id);

    if (!Number.isInteger(restaurantId)) {
      return res.status(400).json({
        success: false,
        message: "Restaurant ID must be a valid number",
      });
    }

    const restaurant = await Restaurant.findOne({
      id: restaurantId,
    });

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

// Add Restaurants - Post
export const createRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.create({
      ...req.body,
      owner: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

// Update Restaurants - Put
export const updateRestaurant = async (req, res, next) => {
  try {
    const restaurantId = Number(req.params.id);

    if (!Number.isInteger(restaurantId)) {
      return res.status(400).json({
        success: false,
        message: "Restaurant ID must be a valid number",
      });
    }

    const restaurant = await Restaurant.findOne({
      id: restaurantId,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    if (restaurant.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this restaurant",
      });
    }

    Object.assign(restaurant, req.body);

    await restaurant.save();

    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Restaurants
export const deleteRestaurant = async (req, res, next) => {
  try {
    const restaurantId = Number(req.params.id);

    if (!Number.isInteger(restaurantId)) {
      return res.status(400).json({
        success: false,
        message: "Restaurant ID must be a valid number",
      });
    }

    const restaurant = await Restaurant.findOne({
      id: restaurantId,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    if (restaurant.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this restaurant",
      });
    }

    await Restaurant.deleteOne({
      _id: restaurant._id,
    });

    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};