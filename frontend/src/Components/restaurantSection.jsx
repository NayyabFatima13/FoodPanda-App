import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import RestaurantCard from "./restaurantCard";

function RestaurantSection({
  title,
  restaurants,
  onFavorite,
  favorites
}) {

  return (
    <section className="restaurant-section">

      <div className="section-heading">

        <h2>{title}</h2>

        <button className="restaurant-next">
          <ArrowRight size={20} />
        </button>

      </div>


      {restaurants.length === 0 ? (

        <div className="no-results">

          <h3>No restaurants found</h3>

          <p>
            Try changing your search or filters.
          </p>

        </div>

      ) : (

        <div className="restaurant-row">

          {restaurants.map((restaurant) => (

            <Link
              key={restaurant.id}
              to={`/restaurants/${restaurant.id}`}
              className="restaurant-card-link"
            >

              <RestaurantCard
                restaurant={restaurant}
                onFavorite={onFavorite}
                isFavorite={
                  favorites.includes(restaurant.id)
                }
              />

            </Link>

          ))}

        </div>

      )}

    </section>
  );
}

export default RestaurantSection;