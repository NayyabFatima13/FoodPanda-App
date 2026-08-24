import { useEffect, useState } from "react";

import RestaurantCard from "../Components/restaurantCard";
import useFetch from "../Hooks/useFetch";
import useLocalStorage from "../Hooks/useLocalStorage";

import { useTranslation } from "react-i18next";


function Favorites() {

  const { t } = useTranslation();


  const {
    data,
    loading,
    error
  } = useFetch("/restaurants.json");


  const [
    favorites,
    setFavorites
  ] = useLocalStorage(
    "favorites",
    []
  );


  const [
    favoriteRestaurants,
    setFavoriteRestaurants
  ] = useState([]);


  useEffect(() => {

    // Determine the array
    // Handles both direct array
    // or nested object

    const restaurantList =
      Array.isArray(data)
        ? data
        : data?.restaurants || [];


    if (restaurantList.length > 0) {

      const filteredRestaurants =
        restaurantList.filter(
          (restaurant) =>
            favorites.includes(
              restaurant.id
            )
        );


      setFavoriteRestaurants(
        filteredRestaurants
      );

    } else {

      setFavoriteRestaurants([]);

    }

  }, [
    data,
    favorites
  ]);


  // ==========================================
  // REMOVE FAVORITE
  // ==========================================

  const handleFavorite = (id) => {

    setFavorites(
      (previousFavorites) =>
        previousFavorites.filter(
          (favoriteId) =>
            favoriteId !== id
        )
    );

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <h2>
        {t(
          "favorites.loading"
        )}
      </h2>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <h2>
        {t(
          "favorites.error"
        )}
      </h2>

    );

  }


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <div className="favorites-page">


      {/* PAGE HEADING */}

      <h1>
        {t(
          "favorites.title"
        )} ❤️
      </h1>



      {/* NO FAVORITES */}

      {favoriteRestaurants.length === 0 ? (

        <div className="no-favorites">

          <h2>
            {t(
              "favorites.emptyTitle"
            )}
          </h2>


          <p>
            {t(
              "favorites.emptyDescription"
            )}
          </p>

        </div>

      ) : (


        /* FAVORITE RESTAURANTS */

        <div className="restaurant-row">

          {favoriteRestaurants.map(
            (restaurant) => (

              <RestaurantCard

                key={
                  restaurant.id
                }

                restaurant={
                  restaurant
                }

                onFavorite={
                  handleFavorite
                }

                isFavorite={
                  true
                }

              />

            )
          )}

        </div>

      )}

    </div>

  );

}


export default Favorites;