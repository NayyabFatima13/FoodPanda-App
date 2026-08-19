import { Heart } from "lucide-react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  addToCart,
  removeFromCart
} from "../redux/slices/cartSlice";


function RestaurantCard({
  restaurant,
  onFavorite,
  isFavorite
}) {

  const dispatch = useDispatch();


  const cart = useSelector(
    (state) => state.cart.cart
  );


  const isInCart = cart.some(
    (item) => item.id === restaurant.id
  );


  return (

    <div className="restaurant-card">

      {/* Restaurant Image */}

      <div className="restaurant-image-container">

        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-image"
        />


        {/* Favorite button */}

        <button
          className="favorite-button"
          onClick={(event) => {

            event.preventDefault();
            event.stopPropagation();

            onFavorite(restaurant.id);

          }}
        >

          <Heart
            size={20}
            fill={isFavorite ? "red" : "none"}
            color={isFavorite ? "red" : "black"}
          />

        </button>


        {/* Advertisement */}

        {restaurant.ad && (

          <span className="ad-label">
            Ad
          </span>

        )}

      </div>


      {/* Restaurant Information */}

      <div className="restaurant-info">

        <div className="restaurant-title-row">

          <h3>
            {restaurant.name}
          </h3>

          <span className="rating">
            ⭐ {restaurant.rating}
          </span>

        </div>


        <p className="restaurant-meta">
          From {restaurant.deliveryTime}
          {" · "}
          Rs. {restaurant.price}
          {" · "}
          {restaurant.cuisine}
        </p>


        <p className="delivery-info">

          🛵{" "}

          <del>
            {restaurant.oldDelivery}
          </del>

          {" "}

          <span>
            Free for first order
          </span>

        </p>


        <span className="discount">
          ● {restaurant.discount}
        </span>


        <button
          className={`cart-action-btn ${isInCart ? "remove-cart-btn" : ""
            }`}

          onClick={(e) => {

            e.preventDefault();
            e.stopPropagation();


            if (isInCart) {

              dispatch(
                removeFromCart(restaurant.id)
              );

            } else {

              dispatch(
                addToCart(restaurant)
              );

            }

          }}
        >

          {isInCart
            ? "Remove from cart"
            : "Add to cart"}

        </button>

      </div>

    </div>
  );
}


export default RestaurantCard;