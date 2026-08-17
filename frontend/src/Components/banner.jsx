import pandaBanner from "../assets/foodpanda-banner-logo.png";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <section className="delivery-banner">

      <div className="banner-content">

        <h1>
          Sign up for free delivery
          <br />
          on your first order
        </h1>

        <Link to="/register" className="banner-button">
          Sign up
        </Link>

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