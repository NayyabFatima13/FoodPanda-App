import pandaBanner from "../assets/foodpanda-banner-logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Banner() {

  // Get currently logged-in user from Redux
  const user = useSelector(
    (state) => state.auth.user
  );

  // Translation
  const { t } = useTranslation();

  return (
    <section className="delivery-banner">

      <div className="banner-content">

        {user ? (

          // LOGGED IN
          <>
            <h1>
              {t("banner.welcome", {
                name: user.name,
              })}
              <br />
              {t("banner.readyToOrder")}
            </h1>

            <Link
              to="/restaurants"
              className="banner-button"
            >
              {t("banner.browseRestaurants")}
            </Link>
          </>

        ) : (

          // LOGGED OUT
          <>
            <h1>
              {t("banner.freeDelivery")}
              <br />
              {t("banner.firstOrder")}
            </h1>

            <Link
              to="/register"
              className="banner-button"
            >
              {t("banner.signUp")}
            </Link>
          </>

        )}

      </div>


      <div className="banner-image">

        <img
          src={pandaBanner}
          alt="Foodpanda panda"
        />

      </div>

    </section>
  );
}

export default Banner;