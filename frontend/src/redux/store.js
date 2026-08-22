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
    }
});


store.subscribe(() => {

    const state = store.getState();

    localStorage.setItem(
        "cart",
        JSON.stringify(state.cart.cart)
    );

});


export default store;