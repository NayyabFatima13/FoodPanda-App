import { useEffect, useState } from "react";

import RestaurantCard from "../Components/restaurantCard";
import useFetch from "../Hooks/useFetch";
import useLocalStorage from "../Hooks/useLocalStorage";

function Favorites() {
  const {
    data,
    loading,
    error
  } = useFetch("/restaurants.json");

  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

  useEffect(() => {
    // Determine the array (handles both direct array or nested object)
    const restaurantList = Array.isArray(data)
      ? data
      : data?.restaurants || [];

    if (restaurantList.length > 0) {
      const filteredRestaurants = restaurantList.filter((restaurant) =>
        favorites.includes(restaurant.id)
      );
      setFavoriteRestaurants(filteredRestaurants);
    } else {
      setFavoriteRestaurants([]);
    }
  }, [data, favorites]);

  const handleFavorite = (id) => {
    setFavorites((previousFavorites) =>
      previousFavorites.filter((favoriteId) => favoriteId !== id)
    );
  };

  if (loading) {
    return <h2>Loading favorites...</h2>;
  }

  if (error) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div className="favorites-page">
      <h1>My Favorites ❤️</h1>

      {favoriteRestaurants.length === 0 ? (
        <div className="no-favorites">
          <h2>No favorite restaurants yet</h2>
          <p>
            Go back to the home page and click ❤️ on a restaurant.
          </p>
        </div>
      ) : (
        <div className="restaurant-row">
          {favoriteRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onFavorite={handleFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;