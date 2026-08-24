import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} from "../redux/slices/cartSlice";

import Checkout from "../Components/checkout";


function Cart() {

  const cart = useSelector(
    (state) => state.cart.cart
  );

  const dispatch = useDispatch();

  const { t } = useTranslation();


  // Controls checkout visibility
  const [showCheckout, setShowCheckout] =
    useState(false);


  // Subtotal
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );


  // Delivery fee
  const deliveryFee =
    cart.length > 0 ? 100 : 0;


  // Total
  const total =
    subtotal + deliveryFee;


  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cart.length === 0) {

    return (

      <div className="cart-page empty-cart">

        <div className="empty-cart-content">

          <div className="empty-cart-icon">
            🛒
          </div>


          <h1>
            {t("cart.emptyTitle")}
          </h1>


          <p>
            {t("cart.emptyDescription")}
          </p>


          <Link
            to="/restaurants"
            className="browse-restaurants-btn"
          >
            {t("cart.browseRestaurants")}
          </Link>

        </div>

      </div>

    );

  }


  return (

    <div className="cart-page">

      <div className="cart-container">


        {/* ==========================================
            CART HEADER
        ========================================== */}

        <div className="cart-header">

          <h1>
            {t("cart.title")} 🛒
          </h1>


          <p>
            {cart.length}{" "}

            {cart.length === 1
              ? t("cart.item")
              : t("cart.items")
            }

          </p>

        </div>



        {/* ==========================================
            CART LAYOUT
        ========================================== */}

        <div className="cart-layout">


          {/* ==========================================
              LEFT SIDE
          ========================================== */}

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
                      aria-label={t(
                        "cart.decreaseQuantity"
                      )}
                      onClick={() =>
                        dispatch(
                          decreaseQuantity(
                            item.id
                          )
                        )
                      }
                    >
                      −
                    </button>


                    <span>
                      {item.quantity}
                    </span>


                    <button
                      aria-label={t(
                        "cart.increaseQuantity"
                      )}
                      onClick={() =>
                        dispatch(
                          increaseQuantity(
                            item.id
                          )
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
                    {item.price *
                      item.quantity}
                  </strong>


                  <button
                    className="remove-item"
                    onClick={() =>
                      dispatch(
                        removeFromCart(
                          item.id
                        )
                      )
                    }
                  >
                    {t("cart.remove")}
                  </button>

                </div>

              </div>

            ))}

          </div>



          {/* ==========================================
              RIGHT SIDE
          ========================================== */}

          <div className="cart-summary">

            <h2>
              {t("cart.orderSummary")}
            </h2>


            {/* Subtotal */}

            <div className="summary-row">

              <span>
                {t("cart.subtotal")}
              </span>

              <span>
                Rs. {subtotal}
              </span>

            </div>


            {/* Delivery Fee */}

            <div className="summary-row">

              <span>
                {t("cart.deliveryFee")}
              </span>

              <span>
                Rs. {deliveryFee}
              </span>

            </div>


            <hr />


            {/* Total */}

            <div className="summary-total">

              <span>
                {t("cart.total")}
              </span>

              <strong>
                Rs. {total}
              </strong>

            </div>


            {/* Checkout */}

            <button
              className="checkout-btn"
              onClick={() =>
                setShowCheckout(true)
              }
            >
              {t("cart.proceedCheckout")}
            </button>


            {/* Continue Shopping */}

            <Link
              to="/restaurants"
              className="continue-shopping"
            >
              ← {t("cart.continueShopping")}
            </Link>

          </div>

        </div>



        {/* ==========================================
            CHECKOUT
        ========================================== */}

        {showCheckout && (

          <div className="checkout-section">

            <Checkout
              cart={cart}
              total={total}

              onPlaceOrder={(orderData) => {

                console.log(
                  "Order placed:",
                  orderData
                );


                // Clear Redux cart
                dispatch(
                  clearCart()
                );


                // Hide checkout
                setShowCheckout(false);


                // Success message
                alert(
                  `🎉 ${t(
                    "cart.orderPlaced"
                  )}`
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