import "./../App.css";

import { useEffect, useState } from "react";

import Header from "../Components/header";
import Sidebar from "../Components/sidebar";
import Banner from "../Components/banner";
import CuisineSection from "../Components/cuisineSection";
import PromoSection from "../Components/promoSection";
import RestaurantSection from "../Components/restaurantSection";
import InfoSection from "../Components/infoSection";
import Footer from "../Components/footer";

import useFetch from "../Hooks/useFetch";
import useLocalStorage from "../Hooks/useLocalStorage";
import useDebounce from "../Hooks/useDebounce";

function Home() {

  // FETCH RESTAURANTS
  const { data, loading, error, setError
  } = useFetch("/restaurants.json");
  console.log("Restaurant API data:", data);
  console.log("Is array?", Array.isArray(data));

  useEffect(() => {
    fetch("/restaurants.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);

        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Fetch error:", error);

        // setError(error);
        //setLoading(false);
      });
  }, ["/restaurants.json"]);

  // SEARCH
  const [searchText, setSearchText] = useState("");

  const debouncedSearch =
    useDebounce(searchText, 500);


  // FILTERS
  const [filters, setFilters] = useState({
    sort: "Relevance",
    rating4Plus: false,
    cuisines: []
  });

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


  // RESTAURANTS
  const [restaurants, setRestaurants] = useState([]);


  useEffect(() => {
    if (data) {
      setRestaurants(data.restaurants);
    }
  }, [data]);


  // FAVORITES
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

  // SEARCH + FILTER
  let filteredRestaurants = restaurants.filter(
    (restaurant) => {

      const search =
        debouncedSearch.toLowerCase();

      const matchesSearch =
        restaurant.name
          .toLowerCase()
          .includes(search) ||

        restaurant.cuisine
          .toLowerCase()
          .includes(search);

      const matchesRating =
        !filters.rating4Plus ||
        parseFloat(restaurant.rating) >= 4;

      const matchesCuisine =
        filters.cuisines.length === 0 ||
        filters.cuisines.includes(
          restaurant.cuisine
        );

      return (
        matchesSearch &&
        matchesRating &&
        matchesCuisine
      );

    }
  );

  // SORTING

  if (filters.sort === "Fastest") {

    filteredRestaurants.sort(
      (a, b) =>
        a.deliveryTime - b.deliveryTime
    );

  }

  if (filters.sort === "Top rated") {

    filteredRestaurants.sort(
      (a, b) =>
        parseFloat(b.rating) -
        parseFloat(a.rating)
    );

  }

  // LOADING

  if (loading) {
    return <h2>Loading restaurants...</h2>;
  }

  // ERROR

  if (error) {
    return <h2>Something went wrong!</h2>;
  }


  return (
    <>

      <Header
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <main className="main-layout">

        <Sidebar
          filters={filters}
          setFilters={setFilters}
        />

        <div className="main-content">

          <Banner />

          <CuisineSection
            onCuisineSelect={handleCuisineSelect}
            selectedCuisine={filters.cuisines[0]}
          />

          <PromoSection />

          <RestaurantSection
            title="Most popular for groups"
            restaurants={filteredRestaurants}
            onFavorite={handleFavorite}
            favorites={favorites}
          />

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
                  (a, b) => a.deliveryTime - b.deliveryTime).slice(0, 4)
            }
            onFavorite={handleFavorite}
            favorites={favorites}
          />

        </div>

      </main>

      <InfoSection />

      <Footer />

    </>
  );
}

export default Home;