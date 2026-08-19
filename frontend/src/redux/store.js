import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import themeReducer from "./slices/themeSlice";
import restaurantReducer from "./slices/restaurantSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    theme: themeReducer,
    restaurants: restaurantReducer,
  },
});

export default store;