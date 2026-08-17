import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../redux/slices/authSlice";

import { toggleTheme } from "../redux/slices/themeSlice";


import {
  Search,
  Heart,
  ShoppingBag,
  MapPin,
  Globe,
  ChevronDown,
  Bike,
  Store,
  ShoppingCart,
  ArrowRight
} from "lucide-react";

import foodpandaLogo from "../assets/foodpanda-logo-horizontal.png";

function Header({ searchText, setSearchText }) {

  const user = useSelector(
    (state) => state.auth.user
  );

  const dispatch = useDispatch();

  const theme = useSelector(
    (state) => state.theme.theme
  );

  const navigate = useNavigate();

  return (
    <header>

      {/* Top Header */}
      <div className="top-header">

        {/* Logo */}
        <Link to="/" className="logo">
          <img
            src={foodpandaLogo}
            alt="foodpanda"
          />
        </Link>

        {/* Location */}
        <div className="location">

          <MapPin
            size={20}
            className="location-icon"
          />

          <span>
            New address Select your address
          </span>

        </div>

        <NavLink
          to="/restaurants"
          className={({ isActive }) =>
            isActive
              ? "restaurants-link active"
              : "restaurants-link"
          }
        >
          Restaurants
        </NavLink>

        {/* Right Side */}
        <div className="header-actions">

          {/* Conditional Rendering of Login and Signup/Register Butthon */}
          {user ? (
            <>
              <button
                className="user-btn"
                onClick={() => navigate("/dashboard")}
              >
                Hi, {user.name} 👋
              </button>

              <button
                className="logout-btn"
                onClick={() => {

                  dispatch(logout());

                  navigate("/");

                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="login-btn"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>

              <button
                className="signup-btn"
                onClick={() => navigate("/register")}
              >
                Sign up for free delivery
              </button>
            </>
          )}

          {/* Language */}

          <div className="language">

            <Globe size={18} />

            <span>EN</span>

            <ChevronDown size={16} />

          </div>

          {/* Theme */}
          <button
            className="theme-btn"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>


          <Link to="/favorites">
            <button className="icon-btn">
              <Heart size={20} />
            </button>
          </Link>

          <Link to="/cart">
            <button className="cart-btn">
              <ShoppingBag size={20} />
            </button>
          </Link>

        </div>
      </div>


      {/* Bottom Header */}
      <div className="bottom-header">

        <nav className="main-nav">

          <button className="nav-item active">

            <Bike size={20} />

            Delivery

          </button>

          <button className="nav-item">

            <ShoppingBag size={20} />

            Pick-up

          </button>

          <button className="nav-item">

            <ShoppingCart size={20} />

            pandamart

          </button>

          <button className="nav-item">

            <Store size={20} />

            Shops

          </button>

        </nav>


        {/* Search */}
        <div className="search-box">

          <Search
            size={20}
            className="search-icon"
          />

          <input
            type="text"
            placeholder="Search for restaurants, cuisines, and dishes"
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
          />

        </div>

      </div>

    </header>
  );
}

export default Header;