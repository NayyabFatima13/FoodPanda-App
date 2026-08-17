import { createSlice } from "@reduxjs/toolkit";

function getInitialCart() {
    try {
        const savedCart = localStorage.getItem("cart");

        return savedCart
            ? JSON.parse(savedCart)
            : [];
    } catch {
        return [];
    }
}


const initialState = {
    cart: getInitialCart()
};


const cartSlice = createSlice({

    name: "cart",

    initialState,

    reducers: {

        // ADD FOOD
        addToCart: (state, action) => {

            const food = action.payload;

            const existingItem = state.cart.find(
                (item) => item.id === food.id
            );


            if (existingItem) {

                existingItem.quantity += 1;

            } else {

                state.cart.push({
                    ...food,
                    quantity: 1
                });

            }

        },


        // REMOVE FOOD
        removeFromCart: (state, action) => {

            state.cart = state.cart.filter(
                (item) => item.id !== action.payload
            );

        },


        // INCREASE QUANTITY
        increaseQuantity: (state, action) => {

            const item = state.cart.find(
                (item) => item.id === action.payload
            );


            if (item) {
                item.quantity += 1;
            }

        },


        // DECREASE QUANTITY
        decreaseQuantity: (state, action) => {

            const item = state.cart.find(
                (item) => item.id === action.payload
            );


            if (item) {
                item.quantity -= 1;
            }


            state.cart = state.cart.filter(
                (item) => item.quantity > 0
            );

        },


        // CLEAR CART
        clearCart: (state) => {

            state.cart = [];

        }

    }

});


export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
} = cartSlice.actions;


export default cartSlice.reducer;