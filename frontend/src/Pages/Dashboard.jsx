import "../Styles/Dashboard.css";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import useLocalStorage from "../Hooks/useLocalStorage";

import { useTranslation } from "react-i18next";

import {
    ShoppingBag,
    Heart,
    MapPin,
    Package,
    Clock,
    CheckCircle,
} from "lucide-react";


function Dashboard() {

    const { t } = useTranslation();


    const user = useSelector(
        (state) => state.auth.user
    );


    const [favorites] =
        useLocalStorage(
            "favorites",
            []
        );


    const cart = useSelector(
        (state) => state.cart.cart
    );


    const cartItemsCount = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    return (

        <>

            <main className="dashboard">


                {/* ==========================================
                    WELCOME
                ========================================== */}

                <section className="dashboard-welcome">

                    <div>

                        <h1>
                            {t("dashboard.welcome")},{" "}
                            {user?.name} 👋
                        </h1>


                        <p>
                            {t(
                                "dashboard.welcomeDescription"
                            )}
                        </p>

                    </div>

                </section>



                {/* ==========================================
                    STATISTICS
                ========================================== */}

                <section className="dashboard-stats">


                    {/* Total Orders */}

                    <div className="dashboard-card">

                        <Package size={28} />

                        <div>

                            <h3>
                                0
                            </h3>

                            <p>
                                {t(
                                    "dashboard.totalOrders"
                                )}
                            </p>

                        </div>

                    </div>



                    {/* Active Orders */}

                    <div className="dashboard-card">

                        <Clock size={28} />

                        <div>

                            <h3>
                                0
                            </h3>

                            <p>
                                {t(
                                    "dashboard.activeOrders"
                                )}
                            </p>

                        </div>

                    </div>



                    {/* Favorites */}

                    <Link
                        to="/favorites"
                        className="dashboard-card dashboard-card-link"
                    >

                        <Heart size={28} />

                        <div>

                            <h3>
                                {favorites.length}
                            </h3>

                            <p>
                                {t(
                                    "dashboard.favorites"
                                )}
                            </p>

                        </div>

                    </Link>



                    {/* Cart */}

                    <Link
                        to="/cart"
                        className="dashboard-card dashboard-card-link"
                    >

                        <ShoppingBag size={28} />

                        <div>

                            <h3>
                                {cartItemsCount}
                            </h3>

                            <p>
                                {t(
                                    "dashboard.cartItems"
                                )}
                            </p>

                        </div>

                    </Link>

                </section>



                {/* ==========================================
                    CART CONTENT
                ========================================== */}

                <section className="dashboard-cart">

                    <div className="dashboard-section-header">

                        <h2>
                            {t(
                                "dashboard.yourCart"
                            )}
                        </h2>


                        <Link to="/cart">
                            {t(
                                "dashboard.viewCart"
                            )}
                        </Link>

                    </div>



                    {cart.length === 0 ? (

                        <div className="dashboard-empty">

                            <ShoppingBag size={35} />


                            <h3>
                                {t(
                                    "dashboard.emptyCart"
                                )}
                            </h3>


                            <p>
                                {t(
                                    "dashboard.emptyCartDescription"
                                )}
                            </p>


                            <Link to="/restaurants">
                                {t(
                                    "dashboard.browseRestaurants"
                                )}
                            </Link>

                        </div>

                    ) : (

                        <div className="dashboard-cart-items">

                            {cart
                                .slice(0, 3)
                                .map((item) => (

                                    <div
                                        className="dashboard-cart-item"
                                        key={item.id}
                                    >

                                        <div>

                                            <h3>
                                                {item.name}
                                            </h3>


                                            <p>
                                                Rs.{" "}
                                                {item.price}
                                            </p>

                                        </div>


                                        <div className="dashboard-cart-quantity">

                                            <span>
                                                ×{" "}
                                                {item.quantity}
                                            </span>

                                        </div>

                                    </div>

                                ))}

                        </div>

                    )}

                </section>



                {/* ==========================================
                    DASHBOARD CONTENT
                ========================================== */}

                <section className="dashboard-content">


                    {/* ==========================================
                        SIDEBAR
                    ========================================== */}

                    <aside className="dashboard-sidebar">


                        <Link
                            to="/dashboard"
                            className="dashboard-menu active"
                        >

                            <Package size={20} />

                            {t(
                                "dashboard.dashboard"
                            )}

                        </Link>



                        <Link
                            to="/restaurants"
                            className="dashboard-menu"
                        >

                            <ShoppingBag size={20} />

                            {t(
                                "dashboard.restaurants"
                            )}

                        </Link>



                        <Link
                            to="/favorites"
                            className="dashboard-menu"
                        >

                            <Heart size={20} />

                            {t(
                                "dashboard.favorites"
                            )}

                        </Link>



                        <Link
                            to="/cart"
                            className="dashboard-menu"
                        >

                            <ShoppingBag size={20} />

                            {t(
                                "dashboard.cart"
                            )}

                        </Link>



                        <button className="dashboard-menu">

                            <MapPin size={20} />

                            {t(
                                "dashboard.addresses"
                            )}

                        </button>



                        <button className="dashboard-menu">

                            ⚙️

                            {t(
                                "dashboard.accountSettings"
                            )}

                        </button>

                    </aside>



                    {/* ==========================================
                        MAIN DASHBOARD
                    ========================================== */}

                    <div className="dashboard-main">


                        <div className="dashboard-section-header">

                            <h2>
                                {t(
                                    "dashboard.recentOrders"
                                )}
                            </h2>


                            <Link to="/restaurants">
                                {t(
                                    "dashboard.orderAgain"
                                )}
                            </Link>

                        </div>



                        {/* ==========================================
                            ORDER 1
                        ========================================== */}

                        <div className="order-card">

                            <div className="order-info">

                                <div className="order-icon">
                                    🍕
                                </div>


                                <div>

                                    <h3>
                                        Pizza Hut
                                    </h3>


                                    <p>
                                        Large Pizza • 2 items
                                    </p>


                                    <span>
                                        Order #10245
                                    </span>

                                </div>

                            </div>


                            <div className="order-status">

                                <CheckCircle size={18} />

                                <span>
                                    {t(
                                        "dashboard.delivered"
                                    )}
                                </span>

                            </div>


                            <strong>
                                Rs. 1,250
                            </strong>

                        </div>



                        {/* ==========================================
                            ORDER 2
                        ========================================== */}

                        <div className="order-card">

                            <div className="order-info">

                                <div className="order-icon">
                                    🍔
                                </div>


                                <div>

                                    <h3>
                                        McDonald's
                                    </h3>


                                    <p>
                                        Burger • Fries • Drink
                                    </p>


                                    <span>
                                        Order #10244
                                    </span>

                                </div>

                            </div>


                            <div className="order-status preparing">

                                <Clock size={18} />

                                <span>
                                    {t(
                                        "dashboard.preparing"
                                    )}
                                </span>

                            </div>


                            <strong>
                                Rs. 850
                            </strong>

                        </div>

                    </div>

                </section>

            </main>

        </>

    );

}


export default Dashboard;