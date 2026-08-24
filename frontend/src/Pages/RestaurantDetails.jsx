import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

import { fetchRestaurants } from "../redux/slices/restaurantSlice";

import LoadingSpinner from "../Components/loadingSpinner";

import Menu from "../Components/Menu";


function RestaurantDetails() {

  const { id } = useParams();

  const dispatch = useDispatch();

  const { t } = useTranslation();


  // ==========================================
  // GET RESTAURANTS FROM REDUX
  // ==========================================

  const {
    restaurants,
    loading,
    error
  } = useSelector(
    (state) => state.restaurants
  );


  // ==========================================
  // FETCH FROM BACKEND
  // ==========================================

  useEffect(() => {

    if (restaurants.length === 0) {

      dispatch(fetchRestaurants());

    }

  }, [
    dispatch,
    restaurants.length
  ]);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <LoadingSpinner
        message={t(
          "restaurantDetails.loading"
        )}
      />

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <h2>
        {error}
      </h2>

    );

  }


  // ==========================================
  // FIND RESTAURANT
  // ==========================================

  const restaurant =
    restaurants.find(
      (item) =>
        String(item.id) === String(id)
    );


  // ==========================================
  // RESTAURANT NOT FOUND
  // ==========================================

  if (!restaurant) {

    return (

      <div className="restaurant-not-found">

        <h1>
          {t(
            "restaurantDetails.notFound"
          )}
        </h1>


        <p>
          {t(
            "restaurantDetails.notFoundDescription"
          )}
        </p>

      </div>

    );

  }


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <div className="restaurant-details">


      {/* ======================================
          HERO
      ====================================== */}

      <div className="restaurant-details-hero">

        <img
          src={restaurant.image}
          alt={restaurant.name}
        />


        <div className="restaurant-details-info">

          <h1>
            {restaurant.name}
          </h1>


          <p className="restaurant-description">

            {restaurant.description}

          </p>


          <div className="restaurant-details-meta">


            {/* RATING */}

            <span>

              ⭐{" "}
              {restaurant.rating}

            </span>



            {/* CUISINE */}

            <span>
              {restaurant.cuisine}
            </span>



            {/* DELIVERY */}

            <span>

              🛵{" "}
              {restaurant.deliveryTime}

            </span>



            {/* PRICE */}

            <span>

              Rs.{" "}
              {restaurant.price}

            </span>

          </div>


          {/* DISCOUNT */}

          <div className="restaurant-discount">

            🎉{" "}
            {restaurant.discount}

          </div>

        </div>

      </div>



      {/* ======================================
          MENU
      ====================================== */}

      <div className="restaurant-menu-section">

        <h2>
          {t(
            "restaurantDetails.menu"
          )}
        </h2>


        <p>
          {t(
            "restaurantDetails.menuDescription"
          )}
        </p>


        <Menu
          restaurant={{
            ...restaurant,
            menu: []
          }}
        />

      </div>

    </div>

  );

}


export default RestaurantDetails;