import pandaBanner from "../assets/foodpanda-banner-logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


function Banner() {

  // Get currently logged-in user from Redux
  const user = useSelector(
    (state) => state.auth.user
  );


  return (
    <section className="delivery-banner">

      <div className="banner-content">

        {user ? (

          // LOGGED IN
          <>
            <h1>
              Welcome, {user.name}! 👋
              <br />
              Ready to order?
            </h1>

            <Link
              to="restaurants"
              className="banner-button"
            >
              Browse Restaurants
            </Link>
          </>

        ) : (

          // LOGGED OUT
          <>
            <h1>
              Sign up for free delivery
              <br />
              on your first order
            </h1>

            <Link
              to="/register"
              className="banner-button"
            >
              Sign up
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