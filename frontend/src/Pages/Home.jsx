import "./../App.css";

import { useEffect, useRef, useState } from "react";

import Sidebar from "../Components/sidebar";
import Banner from "../Components/banner";
import CuisineSection from "../Components/cuisineSection";
import PromoSection from "../Components/promoSection";
import RestaurantSection from "../Components/restaurantSection";
import InfoSection from "../Components/infoSection";

import useLocalStorage from "../Hooks/useLocalStorage";
import useDebounce from "../Hooks/useDebounce";

import { useDispatch, useSelector } from "react-redux";

import { fetchRestaurants } from "../redux/slices/restaurantSlice";


function Home() {

  // ==========================================
  // REDUX RESTAURANTS
  // ==========================================

  const dispatch = useDispatch();

  const {
    restaurants,
    loading,
    error,
  } = useSelector((state) => state.restaurants);


 useEffect(() => {
  if (restaurants.length === 0) {
    dispatch(fetchRestaurants());
  }
}, [dispatch, restaurants.length]);


  // ==========================================
  // SEARCH
  // ==========================================

 const searchText = useSelector(
    (state) => state.restaurants.searchText
  );

  const debouncedSearch = useDebounce(searchText, 500);

  // ==========================================
  // FILTERS
  // ==========================================

  const [filters, setFilters] = useState({
    sort: "Relevance",
    rating4Plus: false,
    cuisines: []
  });


  // ==========================================
  // CUISINE SELECT FROM CUISINE SECTION
  // ==========================================

  const handleCuisineSelect = (cuisine) => {

    setFilters((previousFilters) => {

      const alreadySelected =
        previousFilters.cuisines.includes(cuisine);

      return {
        ...previousFilters,

        cuisines: alreadySelected
          ? []
          : [cuisine]
      };

    });

  };


  // ==========================================
  // FAVORITES
  // ==========================================

  const [favorites, setFavorites] =
    useLocalStorage("favorites", []);


  const handleFavorite = (id) => {

    setFavorites((previousFavorites) => {

      if (previousFavorites.includes(id)) {

        return previousFavorites.filter(
          (favoriteId) => favoriteId !== id
        );

      }

      return [
        ...previousFavorites,
        id
      ];

    });

  };


  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  let filteredRestaurants = restaurants.filter(
    (restaurant) => {

      const search =
        debouncedSearch.toLowerCase();

      const restaurantName =
        String(
          restaurant.name || ""
        ).toLowerCase();

      const restaurantCuisine =
        Array.isArray(restaurant.cuisine)
          ? restaurant.cuisine
              .join(" ")
              .toLowerCase()
          : String(
              restaurant.cuisine || ""
            ).toLowerCase();


      // SEARCH

      const matchesSearch =
        restaurantName.includes(search) ||
        restaurantCuisine.includes(search);


      // RATING

      const matchesRating =
        !filters.rating4Plus ||
        parseFloat(restaurant.rating) >= 4;


      // CUISINE

      const matchesCuisine =
        filters.cuisines.length === 0 ||
        filters.cuisines.some((selectedCuisine) =>
          Array.isArray(restaurant.cuisine)
            ? restaurant.cuisine.includes(selectedCuisine)
            : restaurant.cuisine === selectedCuisine
        );


      return (
        matchesSearch &&
        matchesRating &&
        matchesCuisine
      );

    }
  );


  // ==========================================
  // SORTING
  // ==========================================

  if (filters.sort === "Fastest") {

    filteredRestaurants.sort(
      (a, b) =>
        Number(a.deliveryTime) -
        Number(b.deliveryTime)
    );

  }


  if (filters.sort === "Top rated") {

    filteredRestaurants.sort(
      (a, b) =>
        parseFloat(b.rating) -
        parseFloat(a.rating)
    );

  }


  // ==========================================
  // RESTAURANT RESULTS REF
  // ==========================================

  const restaurantResultsRef =
    useRef(null);


  // ==========================================
  // SCROLL TO RESTAURANTS WHEN SORT CHANGES
  // ==========================================

  useEffect(() => {

    if (
      filters.sort === "Fastest" ||
      filters.sort === "Top rated"
    ) {

      setTimeout(() => {

        restaurantResultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }, 100);

    }

  }, [filters.sort]);


  // ==========================================
  // DETERMINE PAGE MODE
  // ==========================================

  const isSearching =
    Boolean(debouncedSearch);

  const isSorting =
    filters.sort !== "Relevance";

  const showNormalHome =
    !isSearching && !isSorting;


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return <h2>Loading restaurants...</h2>;

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return <h2>{error}</h2>;

  }


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <>
      <main className="main-layout">

        <Sidebar
          filters={filters}
          setFilters={setFilters}
        />


        <div className="main-content">


          {/* =====================================
              NORMAL HOME PAGE
              ===================================== */}

          {showNormalHome && (

            <>

              <Banner />

              <CuisineSection
                onCuisineSelect={handleCuisineSelect}
                selectedCuisine={
                  filters.cuisines[0]
                }
              />

              <PromoSection />

            </>

          )}


          {/* =====================================
              SEARCH RESULTS
              ===================================== */}

          {isSearching && (

            <div className="search-results-heading">

              <h2>
                Search results for "{debouncedSearch}"
              </h2>

            </div>

          )}


          {/* =====================================
              SORT RESULTS HEADING
              ===================================== */}

          {isSorting && !isSearching && (

            <div className="search-results-heading">

              <h2>

                {filters.sort === "Fastest"
                  ? "Fastest delivery"
                  : "Top rated restaurants"}

              </h2>

              <p>
                Showing the best results based on your filter
              </p>

            </div>

          )}


          {/* =====================================
              MAIN RESTAURANT RESULTS
              ===================================== */}

          <div
            ref={restaurantResultsRef}
            className="restaurant-results"
          >

            <RestaurantSection

              title={
                isSearching
                  ? `Restaurants matching "${debouncedSearch}"`
                  : isSorting
                    ? filters.sort === "Fastest"
                      ? "Fastest delivery"
                      : "Top rated restaurants"
                    : "Most popular for groups"
              }

              restaurants={filteredRestaurants}

              onFavorite={handleFavorite}

              favorites={favorites}

            />

          </div>


          {/* =====================================
              RECOMMENDED + FASTEST
              ONLY NORMAL HOME PAGE
              ===================================== */}

          {showNormalHome && (

            <>

              <RestaurantSection

                title="Recommended for you"

                restaurants={
                  filteredRestaurants.slice(4, 8)
                }

                onFavorite={handleFavorite}

                favorites={favorites}

              />


              <RestaurantSection

                title="Fastest delivery"

                restaurants={
                  filteredRestaurants
                    .slice()
                    .sort(
                      (a, b) =>
                        Number(a.deliveryTime) -
                        Number(b.deliveryTime)
                    )
                    .slice(0, 4)
                }

                onFavorite={handleFavorite}

                favorites={favorites}

              />

            </>

          )}

        </div>

      </main>


      {/* =====================================
          INFO SECTION
          ===================================== */}

      {showNormalHome && <InfoSection />}


    </>

  );

}


export default Home;