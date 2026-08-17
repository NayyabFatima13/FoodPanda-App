import { useParams } from "react-router-dom";

import useFetch from "../Hooks/useFetch";

import Menu from "../Components/Menu";


function RestaurantDetails() {

  const { id } = useParams();


  const {
    data,
    loading,
    error
  } = useFetch("/restaurants.json");


  if (loading) {
    return <h2>Loading restaurant...</h2>;
  }


  if (error) {
    return <h2>Something went wrong!</h2>;
  }


  const restaurants =
    data?.restaurants || [];


  const restaurant =
    restaurants.find(
      (item) =>
        item.id === Number(id)
    );


  if (!restaurant) {

    return (

      <div className="restaurant-not-found">

        <h1>
          Restaurant not found
        </h1>

        <p>
          The restaurant you're looking
          for doesn't exist.
        </p>

      </div>

    );

  }


  return (

    <div className="restaurant-details">

      {/* Hero */}

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

            <span>
              ⭐ {restaurant.rating}
            </span>

            <span>
              {restaurant.cuisine}
            </span>

            <span>
              🛵 {restaurant.deliveryTime}
            </span>

            <span>
              {restaurant.price}
            </span>

          </div>


          <div className="restaurant-discount">

            🎉 {restaurant.discount}

          </div>

        </div>

      </div>


      {/* Menu */}

      <div className="restaurant-menu-section">

        <h2>
          Menu
        </h2>

        <p>
          Choose your favorite food
          and add it to your cart.
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