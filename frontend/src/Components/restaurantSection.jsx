import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import RestaurantCard from "./restaurantCard";


function RestaurantSection({
  title,
  restaurants,
  onFavorite,
  favorites
}) {

  const { t } = useTranslation();


  return (

    <section className="restaurant-section">

      <div className="section-heading">

        <h2>
          {title}
        </h2>

        <button
          className="restaurant-next"
          aria-label={t("restaurant.next")}
        >
          <ArrowRight size={20} />
        </button>

      </div>


      {restaurants.length === 0 ? (

        <div className="no-results">

          <h3>
            {t("restaurant.noResults")}
          </h3>

          <p>
            {t("restaurant.tryFilters")}
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
                  favorites.includes(
                    restaurant.id
                  )
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