import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RestaurantCard from "../Components/restaurantCard";
import useLocalStorage from "../Hooks/useLocalStorage";
import useDebounce from "../Hooks/useDebounce";

import { fetchRestaurants } from "../redux/slices/restaurantSlice";

import {
  deleteRestaurant
} from "../redux/slices/restaurantSlice";

function Restaurants() {

  const dispatch = useDispatch();
  const user = useSelector(
    (state) => state.auth.user
  );

  // Get restaurant state from Redux
  const {
    restaurants,
    loading,
    error,
    searchText
  } = useSelector(
    (state) => state.restaurants
  );


  // Fetch restaurants from backend
  useEffect(() => {
    if (restaurants.length === 0) {
      dispatch(fetchRestaurants());
    }
  }, [dispatch, restaurants.length]);

  // Debounce global search text
  const debouncedSearch = useDebounce(
    searchText,
    500
  );


  // Favorites
  const [favorites, setFavorites] =
    useLocalStorage("favorites", []);


  // Filter restaurants
  const filteredRestaurants =
    restaurants.filter((restaurant) =>
      restaurant.name
        ?.toLowerCase()
        .includes(
          debouncedSearch.toLowerCase()
        )
    );


  // Favorite handler
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

  // Delete handler
  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this restaurant?"
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


  // Loading state
  if (loading) {
    return (
      <h2>
        Loading restaurants...
      </h2>
    );
  }


  // Error state
  if (error) {
    return (
      <h2>
        {error}
      </h2>
    );
  }


  return (

    <div className="restaurants-page">

      <div className="restaurants-container">

        <div className="restaurants-header">

          <h1>
            All Restaurants
          </h1>

          <p>
            Discover restaurants and food
            near you
          </p>

          <Link
            to="/restaurants/add"
            className="add-restaurant-button"
          >
            Add Restaurant
          </Link>

          {debouncedSearch && (
            <p>
              Search results for:
              {" "}
              <strong>
                {debouncedSearch}
              </strong>
            </p>
          )}

        </div>


        <div className="restaurant-grid">

          {filteredRestaurants.length > 0 ? (

            filteredRestaurants.map(
              (restaurant) => (

                <div
                  className="restaurant-wrapper"
                  key={restaurant.id}
                >

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

                  {user &&
                    String(restaurant.owner) ===
                    String(user.id) && (

                      <div className="restaurant-actions">

                        <Link
                          to={`/restaurants/edit/${restaurant.id}`}
                          className="edit-restaurant-button"
                        >
                          Edit
                        </Link>


                        <button
                          type="button"
                          className="delete-restaurant-button"
                          onClick={() =>
                            handleDelete(restaurant.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    )}


                </div>

              )
            )

          ) : (

            <h2>
              No restaurants found.
            </h2>

          )}

        </div>

      </div>

    </div>

  );
}


export default Restaurants;