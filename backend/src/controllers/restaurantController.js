import Restaurant from "../models/restaurant.js";

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurants",
      error: error.message,
    });
  }
};

export const createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create restaurant",
      error: error.message,
    });
  }
};