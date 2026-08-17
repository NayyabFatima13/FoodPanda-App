import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },

    cuisine: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    deliveryTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model(
  "Restaurant",
  restaurantSchema
);

export default Restaurant;