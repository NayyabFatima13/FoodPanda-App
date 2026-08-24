import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingSpinner from "../Components/loadingSpinner";

import RestaurantCard from "../Components/restaurantCard";
import useLocalStorage from "../Hooks/useLocalStorage";
import useDebounce from "../Hooks/useDebounce";

import { fetchRestaurants } from "../redux/slices/restaurantSlice";
import { deleteRestaurant } from "../redux/slices/restaurantSlice";

import { useTranslation } from "react-i18next";


function Restaurants() {

  // ==========================================
  // TRANSLATION
  // ==========================================

  const { t } = useTranslation();


  // ==========================================
  // REDUX
  // ==========================================

  const dispatch = useDispatch();


  const user = useSelector(
    (state) => state.auth.user
  );


  // ==========================================
  // RESTAURANT STATE
  // ==========================================

  const {
    restaurants,
    loading,
    error,
    searchText
  } = useSelector(
    (state) => state.restaurants
  );


  // ==========================================
  // FETCH RESTAURANTS
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
  // DEBOUNCE SEARCH
  // ==========================================

  const debouncedSearch = useDebounce(
    searchText,
    500
  );


  // ==========================================
  // FAVORITES
  // ==========================================

  const [favorites, setFavorites] =
    useLocalStorage(
      "favorites",
      []
    );


  // ==========================================
  // FILTER RESTAURANTS
  // ==========================================

  const filteredRestaurants =
    restaurants.filter((restaurant) =>
      restaurant.name
        ?.toLowerCase()
        .includes(
          debouncedSearch.toLowerCase()
        )
    );


  // ==========================================
  // FAVORITE HANDLER
  // ==========================================

  const handleFavorite = (id) => {

    setFavorites((previousFavorites) => {

      if (
        previousFavorites.includes(id)
      ) {

        return previousFavorites.filter(
          (favoriteId) =>
            favoriteId !== id
        );

      }


      return [
        ...previousFavorites,
        id
      ];

    });

  };


  // ==========================================
  // DELETE HANDLER
  // ==========================================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      t("restaurants.confirmDelete")
    );


    if (!confirmed) {

      return;

    }


    try {

      await dispatch(
        deleteRestaurant(id)
      ).unwrap();

    } catch (error) {

      console.error(
        "Delete failed:",
        error
      );

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <LoadingSpinner
        message={t("restaurants.loading")}
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
  // RETURN
  // ==========================================

  return (

    <div className="restaurants-page">

      <div className="restaurants-container">


        {/* ==========================================
            HEADER
            ========================================== */}

        <div className="restaurants-header">

          <h1>
            {t("restaurants.title")}
          </h1>


          <p>
            {t("restaurants.subtitle")}
          </p>


          {/* ADD RESTAURANT */}

          <Link
            to="/restaurants/add"
            className="add-restaurant-button"
          >

            {t("restaurants.addRestaurant")}

          </Link>


          {/* SEARCH RESULT */}

          {debouncedSearch && (

            <p>

              {t("restaurants.searchResults")}

              {" "}

              <strong>
                {debouncedSearch}
              </strong>

            </p>

          )}

        </div>


        {/* ==========================================
            RESTAURANT GRID
            ========================================== */}

        <div className="restaurant-grid">

          {filteredRestaurants.length > 0 ? (

            filteredRestaurants.map(
              (restaurant) => (

                <div
                  className="restaurant-wrapper"
                  key={restaurant.id}
                >


                  {/* RESTAURANT CARD */}

                  <Link
                    to={`/restaurants/${restaurant.id}`}
                    className="restaurant-card-link"
                  >

                    <RestaurantCard
                      restaurant={restaurant}
                      onFavorite={handleFavorite}
                      isFavorite={
                        favorites.includes(
                          restaurant.id
                        )
                      }
                    />

                  </Link>


                  {/* ==========================================
                      OWNER ACTIONS
                      ========================================== */}

                  {user &&
                    String(restaurant.owner) ===
                    String(user.id) && (

                      <div className="restaurant-actions">


                        {/* EDIT */}

                        <Link
                          to={`/restaurants/edit/${restaurant.id}`}
                          className="edit-restaurant-button"
                        >

                          {t("restaurants.edit")}

                        </Link>


                        {/* DELETE */}

                        <button
                          type="button"
                          className="delete-restaurant-button"
                          onClick={() =>
                            handleDelete(
                              restaurant.id
                            )
                          }
                        >

                          {t("restaurants.delete")}

                        </button>


                      </div>

                    )}

                </div>

              )

            )

          ) : (

            <h2>
              {t("restaurants.noRestaurants")}
            </h2>

          )}

        </div>

      </div>

    </div>

  );

}


export default Restaurants;