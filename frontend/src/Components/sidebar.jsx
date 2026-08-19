import { useState } from "react";

import {
    Search,
    ChevronDown,
    ChevronUp
} from "lucide-react";

function Sidebar({ filters, setFilters }) {

    const [showMore, setShowMore] = useState(false);
    const [cuisineSearch, setCuisineSearch] = useState("");

    const cuisines = [
        "American",
        "BBQ",
        "Beverages",
        "Biryani",
        "Broast",
        "Burgers",
        "Cakes & Bakery",
        "Chinese",
        "Continental",
        "Desserts",
        "Fast Food",
        "Italian"
    ];

    // Search cuisines
    const filteredCuisines = cuisines.filter((cuisine) =>
        cuisine
            .toLowerCase()
            .includes(cuisineSearch.toLowerCase())
    );

    // Handle cuisine checkbox
    const handleCuisineChange = (cuisine) => {

        setFilters((previousFilters) => {

            const alreadySelected =
                previousFilters.cuisines.includes(cuisine);

            let updatedCuisines;

            if (alreadySelected) {

                updatedCuisines =
                    previousFilters.cuisines.filter(
                        (item) => item !== cuisine
                    );

            } else {

                updatedCuisines = [
                    ...previousFilters.cuisines,
                    cuisine
                ];

            }

            return {
                ...previousFilters,
                cuisines: updatedCuisines
            };

        });

    };

    // Reset all filters
    const resetFilters = () => {

        setFilters({
            sort: "Relevance",
            rating4Plus: false,
            cuisines: []
        });

        // Also clear cuisine search
        setCuisineSearch("");
        setShowMore(false);
    };

    return (

        <aside className="sidebar">

            {/* FILTER HEADING */}

            <div className="filter-heading">

                <h3>Filters</h3>

                <button
                    className="reset-button"
                    onClick={resetFilters}
                >
                    Reset
                </button>

            </div>


            {/* SORT */}

            <div className="filter-section">

                <h4>Sort by</h4>

                <label className="radio-option">

                    <input
                        type="radio"
                        name="sort"
                        checked={filters.sort === "Relevance"}
                        onChange={() =>
                            setFilters({
                                ...filters,
                                sort: "Relevance"
                            })
                        }
                    />

                    <span>Relevance</span>

                </label>


                <label className="radio-option">

                    <input
                        type="radio"
                        name="sort"
                        checked={filters.sort === "Fastest"}
                        onChange={() =>
                            setFilters({
                                ...filters,
                                sort: "Fastest"
                            })
                        }
                    />

                    <span>Fastest delivery</span>

                </label>


                <label className="radio-option">

                    <input
                        type="radio"
                        name="sort"
                        checked={filters.sort === "Top rated"}
                        onChange={() =>
                            setFilters({
                                ...filters,
                                sort: "Top rated"
                            })
                        }
                    />

                    <span>Top rated</span>

                </label>

            </div>


            {/* QUICK FILTERS */}

            <div className="filter-section">

                <h4>Quick filters</h4>

                <label className="quick-filter-checkbox">

                    <input
                        type="checkbox"
                        checked={filters.rating4Plus}
                        onChange={(event) =>
                            setFilters({
                                ...filters,
                                rating4Plus: event.target.checked
                            })
                        }
                    />

                    <span>Ratings 4+</span>

                </label>

            </div>


            {/* OFFERS */}

            <div className="filter-section">

                <h4>Offers</h4>

                <label className="checkbox-option">

                    <input type="checkbox" />

                    <span>Accepts vouchers</span>

                </label>

            </div>


            {/* CUISINES */}

            <div className="filter-section">

                <h4>Cuisines</h4>


                {/* CUISINE SEARCH */}

                <div className="cuisine-search">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search for cuisine"
                        value={cuisineSearch}
                        onChange={(event) =>
                            setCuisineSearch(event.target.value)
                        }
                    />

                </div>


                {/* CUISINE OPTIONS */}

                {(cuisineSearch
                    ? filteredCuisines
                    : showMore
                        ? cuisines
                        : cuisines.slice(0, 7)
                ).map((cuisine) => (

                    <label
                        className="checkbox-option"
                        key={cuisine}
                    >

                        <input
                            type="checkbox"
                            checked={filters.cuisines.includes(cuisine)}
                            onChange={() =>
                                handleCuisineChange(cuisine)
                            }
                        />

                        <span>{cuisine}</span>

                    </label>

                ))}


                {/* NO RESULTS */}

                {cuisineSearch &&
                    filteredCuisines.length === 0 && (

                        <p className="no-cuisine-results">
                            No cuisine found
                        </p>

                    )}


                {/* SHOW MORE / LESS */}

                {!cuisineSearch && (

                    <button
                        className="show-more"
                        onClick={() =>
                            setShowMore(!showMore)
                        }
                    >

                        {showMore
                            ? "Show less"
                            : "Show more"
                        }

                        {showMore
                            ? <ChevronUp size={16} />
                            : <ChevronDown size={16} />
                        }

                    </button>

                )}

            </div>


            {/* PRICE */}

            <div className="filter-section">

                <h4>Price</h4>

                <div className="price-buttons">

                    <button>Rs. 1000</button>

                    <button>Rs. 1200</button>

                    <button>Rs. 2000</button>

                </div>

            </div>

        </aside>

    );

}

export default Sidebar;