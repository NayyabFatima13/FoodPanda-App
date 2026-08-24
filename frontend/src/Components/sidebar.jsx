import { useState } from "react";

import {
    Search,
    ChevronDown,
    ChevronUp
} from "lucide-react";

import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";


function Sidebar({ filters, setFilters }) {

    const [showMore, setShowMore] =
        useState(false);

    const [cuisineSearch, setCuisineSearch] =
        useState("");

    const { t } = useTranslation();


    // ==========================================
    // CUISINE LIST
    // ==========================================

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


    // ==========================================
    // SANITIZED CUISINE SEARCH
    // ==========================================

    const handleCuisineSearchChange = (event) => {

        const sanitizedValue =
            DOMPurify.sanitize(
                event.target.value,
                {
                    ALLOWED_TAGS: [],
                    ALLOWED_ATTR: []
                }
            );

        setCuisineSearch(sanitizedValue);

    };


    // ==========================================
    // SEARCH CUISINES
    // ==========================================

    const filteredCuisines =
        cuisines.filter((cuisine) =>
            cuisine
                .toLowerCase()
                .includes(
                    cuisineSearch.toLowerCase()
                )
        );


    // ==========================================
    // HANDLE CUISINE CHECKBOX
    // ==========================================

    const handleCuisineChange = (cuisine) => {

        setFilters((previousFilters) => {

            const alreadySelected =
                previousFilters.cuisines.includes(
                    cuisine
                );

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


    // ==========================================
    // RESET ALL FILTERS
    // ==========================================

    const resetFilters = () => {

        setFilters({
            sort: "Relevance",
            rating4Plus: false,
            cuisines: []
        });

        setCuisineSearch("");
        setShowMore(false);

    };


    // ==========================================
    // CUISINE TRANSLATION
    // ==========================================

    const getCuisineTranslationKey = (
        cuisine
    ) => {

        const cuisineKeys = {
            "American": "american",
            "BBQ": "bbq",
            "Beverages": "beverages",
            "Biryani": "biryani",
            "Broast": "broast",
            "Burgers": "burgers",
            "Cakes & Bakery": "cakesBakery",
            "Chinese": "chinese",
            "Continental": "continental",
            "Desserts": "desserts",
            "Fast Food": "fastFood",
            "Italian": "italian"
        };

        return (
            cuisineKeys[cuisine] ||
            cuisine
        );

    };


    return (

        <aside className="sidebar">


            {/* ======================================
                FILTER HEADING
            ====================================== */}

            <div className="filter-heading">

                <h3>
                    {t("sidebar.filters")}
                </h3>


                <button
                    className="reset-button"
                    onClick={resetFilters}
                >
                    {t("sidebar.reset")}
                </button>

            </div>


            {/* ======================================
                SORT
            ====================================== */}

            <div className="filter-section">

                <h4>
                    {t("sidebar.sortBy")}
                </h4>


                <label className="radio-option">

                    <input
                        type="radio"
                        name="sort"
                        checked={
                            filters.sort === "Relevance"
                        }
                        onChange={() =>
                            setFilters({
                                ...filters,
                                sort: "Relevance"
                            })
                        }
                    />

                    <span>
                        {t("sidebar.relevance")}
                    </span>

                </label>


                <label className="radio-option">

                    <input
                        type="radio"
                        name="sort"
                        checked={
                            filters.sort === "Fastest"
                        }
                        onChange={() =>
                            setFilters({
                                ...filters,
                                sort: "Fastest"
                            })
                        }
                    />

                    <span>
                        {t("sidebar.fastestDelivery")}
                    </span>

                </label>


                <label className="radio-option">

                    <input
                        type="radio"
                        name="sort"
                        checked={
                            filters.sort === "Top rated"
                        }
                        onChange={() =>
                            setFilters({
                                ...filters,
                                sort: "Top rated"
                            })
                        }
                    />

                    <span>
                        {t("sidebar.topRated")}
                    </span>

                </label>

            </div>


            {/* ======================================
                QUICK FILTERS
            ====================================== */}

            <div className="filter-section">

                <h4>
                    {t("sidebar.quickFilters")}
                </h4>


                <label className="quick-filter-checkbox">

                    <input
                        type="checkbox"
                        checked={
                            filters.rating4Plus
                        }
                        onChange={(event) =>
                            setFilters({
                                ...filters,
                                rating4Plus:
                                    event.target.checked
                            })
                        }
                    />

                    <span>
                        {t("sidebar.ratings4Plus")}
                    </span>

                </label>

            </div>


            {/* ======================================
                OFFERS
            ====================================== */}

            <div className="filter-section">

                <h4>
                    {t("sidebar.offers")}
                </h4>


                <label className="checkbox-option">

                    <input type="checkbox" />

                    <span>
                        {t("sidebar.acceptsVouchers")}
                    </span>

                </label>

            </div>


            {/* ======================================
                CUISINES
            ====================================== */}

            <div className="filter-section">

                <h4>
                    {t("sidebar.cuisines")}
                </h4>


                {/* CUISINE SEARCH */}

                <div className="cuisine-search">

                    <Search size={18} />


                    <input
                        type="text"
                        placeholder={
                            t(
                                "sidebar.searchCuisine"
                            )
                        }
                        value={cuisineSearch}
                        onChange={
                            handleCuisineSearchChange
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
                            checked={
                                filters.cuisines.includes(
                                    cuisine
                                )
                            }
                            onChange={() =>
                                handleCuisineChange(
                                    cuisine
                                )
                            }
                        />


                        <span>
                            {t(
                                `sidebar.cuisineItems.${getCuisineTranslationKey(
                                    cuisine
                                )}`
                            )}
                        </span>

                    </label>

                ))}


                {/* NO RESULTS */}

                {cuisineSearch &&
                    filteredCuisines.length === 0 && (

                        <p className="no-cuisine-results">

                            {t(
                                "sidebar.noCuisine"
                            )}

                        </p>

                    )}


                {/* SHOW MORE / LESS */}

                {!cuisineSearch && (

                    <button
                        className="show-more"
                        onClick={() =>
                            setShowMore(
                                !showMore
                            )
                        }
                    >

                        {showMore
                            ? t("sidebar.showLess")
                            : t("sidebar.showMore")
                        }


                        {showMore
                            ? (
                                <ChevronUp
                                    size={16}
                                />
                            )
                            : (
                                <ChevronDown
                                    size={16}
                                />
                            )
                        }

                    </button>

                )}

            </div>


            {/* ======================================
                PRICE
            ====================================== */}

            <div className="filter-section">

                <h4>
                    {t("sidebar.price")}
                </h4>

                <div className="price-buttons">


                    <button
                        className={
                            filters.price === 1000
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setFilters({
                                ...filters,
                                price:
                                    filters.price === 1000
                                        ? null
                                        : 1000
                            })
                        }
                    >
                        Rs. 1000
                    </button>


                    <button
                        className={
                            filters.price === 1200
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setFilters({
                                ...filters,
                                price:
                                    filters.price === 1200
                                        ? null
                                        : 1200
                            })
                        }
                    >
                        Rs. 1200
                    </button>


                    <button
                        className={
                            filters.price === 2000
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setFilters({
                                ...filters,
                                price:
                                    filters.price === 2000
                                        ? null
                                        : 2000
                            })
                        }
                    >
                        Rs. 2000
                    </button>

                </div>

            </div>


        </aside>

    );

}

export default Sidebar;