import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    //Data Validation through mongoose validation
    id: {
      type: Number,
      required: [true, "Restaurant ID is required"],
      unique: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Restaurant name is required"],
      trim: true,     // This is examples of normalization/sanitization.
      unique: true,
    },

    cuisine: {
      type: String,
      required: [true, "Cuisine is required"],
      trim: true,    // This is examples of normalization/sanitization.
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be greater than 5"],
    },

    deliveryTime: {
      type: String,
      required: [true, "Delivery time is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },

    discount: {
      type: String,
      required: [true, "Discount is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
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