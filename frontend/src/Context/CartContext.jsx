import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

import {
  cartReducer,
  initialState,
} from "./reducers/cartReducer";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [state, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(state.cart)
    );
  }, [state.cart]);


  // ADD FOOD
  const addToCart = (food) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: food,
    });
  };


  // REMOVE FOOD
  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };


  // INCREASE QUANTITY
  const increaseQuantity = (id) => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: id,
    });
  };


  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: id,
    });
  };


  // CLEAR CART
  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };


  return (
    <CartContext.Provider
      value={{
        cart: state.cart,

        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  return useContext(CartContext);
}


export default CartProvider;