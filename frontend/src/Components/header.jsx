import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { setSearchText } from "../redux/slices/restaurantSlice";
import { logout } from "../redux/slices/authSlice";
import { toggleTheme } from "../redux/slices/themeSlice";

import DOMPurify from "dompurify";
import LocationModal from "./locationModal";

import {
  Search,
  Heart,
  ShoppingBag,
  MapPin,
  Globe,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import foodpandaLogo from "../assets/foodpanda-logo-horizontal.png";

function Header() {
  // ==========================================
  // REDUX STATE
  // ==========================================

  const searchText = useSelector(
    (state) => state.restaurants.searchText
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const theme = useSelector(
    (state) => state.theme.theme
  );

  const cart = useSelector(
    (state) => state.cart.cart
  );

  // ==========================================
  // CART COUNT
  // ==========================================

  const cartItemCount = cart.reduce(
    (total, item) =>
      total + (item.quantity || 1),
    0
  );

  // ==========================================
  // DISPATCH / NAVIGATION
  // ==========================================

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ==========================================
  // TRANSLATION
  // ==========================================

  const { t, i18n } = useTranslation();

  const [languageOpen, setLanguageOpen] =
    useState(false);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);

    localStorage.setItem(
      "language",
      language
    );

    setLanguageOpen(false);
  };

  // ==========================================
  // MOBILE MENU
  // ==========================================

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  // ==========================================
  // SANITIZE SEARCH
  // ==========================================

  const handleSearchChange = (e) => {
    const sanitizedValue =
      DOMPurify.sanitize(
        e.target.value,
        {
          ALLOWED_TAGS: [],
          ALLOWED_ATTR: [],
        }
      );

    dispatch(
      setSearchText(sanitizedValue)
    );
  };

  const handleSearch = () => {
    navigate("/restaurants");
  };

  // ==========================================
  // LOCATION
  // ==========================================

  const [locationOpen, setLocationOpen] =
    useState(false);

  const [selectedLocation, setSelectedLocation] =
    useState(() => {

      const savedLocation =
        localStorage.getItem(
          "selectedLocation"
        );

      if (!savedLocation) {
        return null;
      }

      try {
        return JSON.parse(savedLocation);
      } catch {
        return null;
      }

    });


  // ==========================================
  // LANGUAGE DROPDOWN
  // ==========================================

  const handleLanguageClick = (e) => {
    e.stopPropagation();

    setLanguageOpen((previous) => !previous);
  };

  return (
    <header>

      {/* ==========================================
          MOBILE HEADER
          ========================================== */}

      <div className="mobile-header">

        <button
          className="hamburger-btn"
          onClick={() =>
            setIsMenuOpen(!isMenuOpen)
          }
        >
          {isMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

        <Link
          to="/"
          className="mobile-logo"
        >
          <img
            src={foodpandaLogo}
            alt="foodpanda"
          />
        </Link>

        {/* MOBILE CART */}

        <Link
          to="/cart"
          className="mobile-cart cart-icon-wrapper"
        >
          <ShoppingBag size={22} />

          {cartItemCount > 0 && (
            <span className="cart-badge">
              {cartItemCount > 99
                ? "99+"
                : cartItemCount}
            </span>
          )}
        </Link>

      </div>


      {/* ==========================================
          MOBILE MENU
          ========================================== */}

      {isMenuOpen && (

        <div className="mobile-menu">

          {/* FAVORITES */}

          <Link
            to="/favorites"
            className="mobile-menu-item"
            onClick={() =>
              setIsMenuOpen(false)
            }
          >
            <Heart size={20} />

            <span>
              Favorites
            </span>
          </Link>


          {/* CART */}

          <Link
            to="/cart"
            className="mobile-menu-item"
            onClick={() =>
              setIsMenuOpen(false)
            }
          >
            <ShoppingBag size={20} />

            <span>
              {t("header.cart")}
            </span>
          </Link>


          {/* ==========================================
              LOGGED IN
              ========================================== */}

          {user ? (
            <>
              <button
                className="mobile-menu-item"
                onClick={() => {
                  navigate("/dashboard");

                  setIsMenuOpen(false);
                }}
              >
                👤

                <span>
                  Hi, {user.name}
                </span>
              </button>

              <button
                className="mobile-menu-item"
                onClick={() => {
                  dispatch(logout());

                  navigate("/");

                  setIsMenuOpen(false);
                }}
              >
                🚪

                <span>
                  {t("header.logout")}
                </span>
              </button>
            </>
          ) : (

            /* ==========================================
                NOT LOGGED IN
                ========================================== */

            <>
              <button
                className="mobile-menu-item"
                onClick={() => {
                  navigate("/login");

                  setIsMenuOpen(false);
                }}
              >
                👤

                <span>
                  {t("header.login")}
                </span>
              </button>

              <button
                className="mobile-menu-item"
                onClick={() => {
                  navigate("/register");

                  setIsMenuOpen(false);
                }}
              >
                📝

                <span>
                  Register
                </span>
              </button>
            </>
          )}


          {/* ==========================================
              THEME
              ========================================== */}

          <button
            className="mobile-menu-item"
            onClick={() =>
              dispatch(toggleTheme())
            }
          >
            {theme === "light"
              ? "🌙"
              : "☀️"
            }

            <span>
              {theme === "light"
                ? "Dark mode"
                : "Light mode"
              }
            </span>
          </button>


          {/* ==========================================
              MOBILE LANGUAGE
              ========================================== */}

          <div className="language">

            <button
              className="language-toggle"
              onClick={handleLanguageClick}
            >
              <Globe size={18} />

              <span>
                {i18n.language === "ur"
                  ? "اردو"
                  : "EN"}
              </span>

              <ChevronDown
                size={16}
              />
            </button>


            {languageOpen && (

              <div className="language-dropdown">

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    changeLanguage("en");
                  }}
                >
                  English
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    changeLanguage("ur");
                  }}
                >
                  اردو
                </button>

              </div>

            )}

          </div>

        </div>
      )}


      {/* ==========================================
          TOP HEADER - DESKTOP
          ========================================== */}

      <div className="top-header">


        {/* ==========================================
            LOGO
            ========================================== */}

        <Link
          to="/"
          className="logo"
        >
          <img
            src={foodpandaLogo}
            alt="foodpanda"
          />
        </Link>


        {/* ==========================================
            LOCATION
            ========================================== */}

        <button
          className="location"
          onClick={() =>
            setLocationOpen(true)
          }
        >

          <MapPin
            size={20}
            className="location-icon"
          />

          <span>
            {selectedLocation
              ? selectedLocation.address
              : "New address Select your address"}
          </span>

        </button>


        {/* ==========================================
            RESTAURANTS
            ========================================== */}

        <NavLink
          to="/restaurants"
          className={({ isActive }) =>
            isActive
              ? "restaurants-link active"
              : "restaurants-link"
          }
        >
          {t("header.restaurants")}
        </NavLink>


        {/* ==========================================
            RIGHT SIDE
            ========================================== */}

        <div className="header-actions">


          {/* ==========================================
              USER
              ========================================== */}

          {user ? (
            <>
              <button
                className="user-btn"
                onClick={() =>
                  navigate("/dashboard")
                }
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
                {t("header.logout")}
              </button>
            </>
          ) : (
            <>
              <button
                className="login-btn"
                onClick={() =>
                  navigate("/login")
                }
              >
                {t("header.login")}
              </button>

              <button
                className="signup-btn"
                onClick={() =>
                  navigate("/register")
                }
              >
                Sign up for free delivery
              </button>
            </>
          )}


          {/* ==========================================
              LANGUAGE
              ========================================== */}

          <div className="language">

            <button
              className="language-toggle"
              onClick={handleLanguageClick}
            >
              <Globe size={18} />

              <span>
                {i18n.language === "ur"
                  ? "اردو"
                  : "EN"}
              </span>

              <ChevronDown
                size={16}
              />
            </button>


            {languageOpen && (

              <div className="language-dropdown">

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    changeLanguage("en");
                  }}
                >
                  English
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    changeLanguage("ur");
                  }}
                >
                  اردو
                </button>

              </div>

            )}

          </div>


          {/* ==========================================
              THEME
              ========================================== */}

          <button
            className="theme-btn"
            onClick={() =>
              dispatch(toggleTheme())
            }
          >
            {theme === "light"
              ? "🌙"
              : "☀️"
            }
          </button>


          {/* ==========================================
              FAVORITES
              ========================================== */}

          <Link to="/favorites">

            <button className="icon-btn">

              <Heart size={20} />

            </button>

          </Link>


          {/* ==========================================
              CART
              ========================================== */}

          <Link to="/cart">

            <button
              className="cart-btn cart-icon-wrapper"
            >

              <ShoppingBag size={20} />

              {cartItemCount > 0 && (

                <span className="cart-badge">

                  {cartItemCount > 99
                    ? "99+"
                    : cartItemCount
                  }

                </span>

              )}

            </button>

          </Link>

        </div>

      </div>


      {/* ==========================================
          BOTTOM HEADER
          ========================================== */}

      <div className="bottom-header">


        {/* ==========================================
            SEARCH
            ========================================== */}

        <div className="search-box">

          <Search />

          <input
            type="text"
            placeholder={t("header.search")}
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={(e) => {

              if (e.key === "Enter") {

                e.preventDefault();

                handleSearch();

              }

            }}
          />

        </div>

      </div>
      
      {locationOpen && (
        <LocationModal
          onClose={() => setLocationOpen(false)}
          onLocationSelect={(location) => {
            setSelectedLocation(location);
            setLocationOpen(false);
          }}
        />
      )}

    </header>
  );
}

export default Header;