import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} from "../redux/slices/cartSlice";

import Checkout from "../components/Checkout";


function Cart() {

  const cart = useSelector(
    (state) => state.cart.cart
  );

  const dispatch = useDispatch();

  // Controls checkout visibility
  const [showCheckout, setShowCheckout] = useState(false);


  // Subtotal
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );


  // Delivery fee
  const deliveryFee = cart.length > 0 ? 100 : 0;


  // Total
  const total = subtotal + deliveryFee;


  // Empty cart
  if (cart.length === 0) {

    return (

      <div className="cart-page empty-cart">

        <div className="empty-cart-content">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h1>
            Your cart is empty
          </h1>

          <p>
            Looks like you haven't added anything
            to your cart yet.
          </p>

          <Link
            to="/restaurants"
            className="browse-restaurants-btn"
          >
            Browse Restaurants
          </Link>

        </div>

      </div>

    );

  }


  return (

    <div className="cart-page">

      <div className="cart-container">


        {/* CART HEADER */}

        <div className="cart-header">

          <h1>
            Your Cart 🛒
          </h1>

          <p>
            {cart.length} item
            {cart.length !== 1 ? "s" : ""}
          </p>

        </div>



        {/* CART LAYOUT */}

        <div className="cart-layout">


          {/* LEFT SIDE */}

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >


                {/* Image */}

                <div className="cart-item-image">

                  {item.image ? (

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  ) : (

                    <div className="food-placeholder">
                      🍔
                    </div>

                  )}

                </div>



                {/* Information */}

                <div className="cart-item-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p className="cart-item-price">
                    Rs. {item.price}
                  </p>


                  {/* Quantity */}

                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQuantity(item.id)
                        )
                      }
                    >
                      −
                    </button>


                    <span>
                      {item.quantity}
                    </span>


                    <button
                      onClick={() =>
                        dispatch(
                          increaseQuantity(item.id)
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                </div>



                {/* Item Total */}

                <div className="cart-item-right">

                  <strong>
                    Rs.{" "}
                    {item.price * item.quantity}
                  </strong>


                  <button
                    className="remove-item"
                    onClick={() =>
                      dispatch(
                        removeFromCart(item.id)
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>



          {/* RIGHT SIDE */}

          <div className="cart-summary">

            <h2>
              Order Summary
            </h2>


            {/* Subtotal */}

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <span>
                Rs. {subtotal}
              </span>

            </div>


            {/* Delivery Fee */}

            <div className="summary-row">

              <span>
                Delivery fee
              </span>

              <span>
                Rs. {deliveryFee}
              </span>

            </div>


            <hr />


            {/* Total */}

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                Rs. {total}
              </strong>

            </div>


            {/* Checkout */}

            <button
              className="checkout-btn"
              onClick={() => setShowCheckout(true)}
            >
              Proceed to Checkout
            </button>


            {/* Continue Shopping */}

            <Link
              to="/restaurants"
              className="continue-shopping"
            >
              ← Continue Shopping
            </Link>

          </div>

        </div>



        {/* CHECKOUT */}

        {showCheckout && (

          <div className="checkout-section">

            <Checkout
              cart={cart}
              total={total}

              onPlaceOrder={(orderData) => {

                // See the complete order in console
                console.log(
                  "Order placed:",
                  orderData
                );


                // Clear Redux cart
                dispatch(clearCart());


                // Hide checkout
                setShowCheckout(false);


                // Success message
                alert(
                  "🎉 Order placed successfully!"
                );

              }}

            />

          </div>

        )}

      </div>

    </div>

  );

}


export default Cart;