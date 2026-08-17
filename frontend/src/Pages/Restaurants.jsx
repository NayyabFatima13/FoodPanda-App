import { Link } from "react-router-dom";

import RestaurantCard from "../Components/restaurantCard";

import useFetch from "../Hooks/useFetch";
import useLocalStorage from "../Hooks/useLocalStorage";


function Restaurants() {

  const {
    data,
    loading,
    error
  } = useFetch("/restaurants.json");


  const [favorites, setFavorites] =
    useLocalStorage("favorites", []);


  const restaurants =
    data?.restaurants || [];


  const handleFavorite = (id) => {

    setFavorites((previousFavorites) => {

      if (previousFavorites.includes(id)) {

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


  if (loading) {
    return <h2>Loading restaurants...</h2>;
  }


  if (error) {
    return <h2>Something went wrong!</h2>;
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

        </div>


        <div className="restaurant-grid">

          {restaurants.map(
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

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );
}


export default Restaurants;