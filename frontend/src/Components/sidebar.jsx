import { useState } from "react";

import {
    Search,
    ChevronDown,
    ChevronUp
} from "lucide-react";

function Sidebar({ filters, setFilters }) {

    const [showMore, setShowMore] = useState(false);

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


    const resetFilters = () => {

        setFilters({
            sort: "Relevance",
            rating4Plus: false,
            cuisines: []
        });

    };


    return (
        <aside className="sidebar">

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

                <div className="cuisine-search">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search for cuisine"
                    />

                </div>


                {(showMore
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


                <button
                    className="show-more"
                    onClick={() =>
                        setShowMore(!showMore)
                    }
                >

                    {showMore ? "Show less" : "Show more"}

                    {showMore
                        ? <ChevronUp size={16} />
                        : <ChevronDown size={16} />
                    }

                </button>

            </div>


            {/* PRICE */}

            <div className="filter-section">

                <h4>Price</h4>

                <div className="price-buttons">

                    <button>$</button>
                    <button>$$</button>
                    <button>$$$</button>

                </div>

            </div>

        </aside>
    );
}

export default Sidebar;