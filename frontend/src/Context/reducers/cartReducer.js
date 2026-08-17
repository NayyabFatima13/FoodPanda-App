const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,

          cart: state.cart.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }

            return item;
          }),
        };
      }

      return {
        ...state,

        cart: [
          ...state.cart,
          {
            ...action.payload,
            quantity: 1,
          },
        ],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,

        cart: state.cart.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,

        cart: state.cart.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        }),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,

        cart: state.cart
          .map((item) => {
            if (item.id === action.payload) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }

            return item;
          })
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
}

export { initialState, cartReducer };