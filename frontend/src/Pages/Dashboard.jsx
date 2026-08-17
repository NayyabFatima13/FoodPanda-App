import "../Styles/Dashboard.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import useLocalStorage from "../Hooks/useLocalStorage";

import {
    ShoppingBag,
    Heart,
    MapPin,
    Package,
    Clock,
    CheckCircle,
} from "lucide-react";

import Header from "../Components/header";

function Dashboard() {
    const [searchText, setSearchText] = useState("");

    const user = useSelector(
    (state) => state.auth.user
);


    const [favorites] =
        useLocalStorage("favorites", []);


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
            <Header
                searchText={searchText}
                setSearchText={setSearchText}
            />

            <main className="dashboard">

                {/* Welcome */}
                <section className="dashboard-welcome">

                    <div>
                        <h1>
                            Welcome back, {user?.name} 👋
                        </h1>

                        <p>
                            Manage your orders, favorites and account
                            from your dashboard.
                        </p>
                    </div>

                </section>


                {/* Statistics */}
                <section className="dashboard-stats">

                    {/* Total Orders */}
                    <div className="dashboard-card">

                        <Package size={28} />

                        <div>
                            <h3>0</h3>
                            <p>Total Orders</p>
                        </div>

                    </div>


                    {/* Active Orders */}
                    <div className="dashboard-card">

                        <Clock size={28} />

                        <div>
                            <h3>0</h3>
                            <p>Active Orders</p>
                        </div>

                    </div>


                    {/* Favorites */}
                    <Link
                        to="/favorites"
                        className="dashboard-card dashboard-card-link"
                    >

                        <Heart size={28} />

                        <div>
                            <h3>{favorites.length}</h3>
                            <p>Favorites</p>
                        </div>

                    </Link>


                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="dashboard-card dashboard-card-link"
                    >

                        <ShoppingBag size={28} />

                        <div>
                            <h3>{cartItemsCount}</h3>
                            <p>Cart Items</p>
                        </div>

                    </Link>

                </section>

                {/* Cart Content */}
                <section className="dashboard-cart">

                    <div className="dashboard-section-header">

                        <h2>Your Cart</h2>

                        <Link to="/cart">
                            View Cart
                        </Link>

                    </div>


                    {cart.length === 0 ? (

                        <div className="dashboard-empty">

                            <ShoppingBag size={35} />

                            <h3>Your cart is empty</h3>

                            <p>
                                Add something delicious to your cart.
                            </p>

                            <Link to="/restaurants">
                                Browse Restaurants
                            </Link>

                        </div>

                    ) : (

                        <div className="dashboard-cart-items">

                            {cart.slice(0, 3).map((item) => (

                                <div
                                    className="dashboard-cart-item"
                                    key={item.id}
                                >

                                    <div>

                                        <h3>
                                            {item.name}
                                        </h3>

                                        <p>
                                            Rs. {item.price}
                                        </p>

                                    </div>


                                    <div className="dashboard-cart-quantity">

                                        <span>
                                            × {item.quantity}
                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

                {/* Dashboard Content */}
                <section className="dashboard-content">


                    {/* Sidebar */}
                    <aside className="dashboard-sidebar">

                        <Link
                            to="/dashboard"
                            className="dashboard-menu active"
                        >
                            <Package size={20} />
                            Dashboard
                        </Link>

                        <Link
                            to="/restaurants"
                            className="dashboard-menu"
                        >
                            <ShoppingBag size={20} />
                            Restaurants
                        </Link>

                        <Link
                            to="/favorites"
                            className="dashboard-menu"
                        >
                            <Heart size={20} />
                            Favorites
                        </Link>

                        <Link
                            to="/cart"
                            className="dashboard-menu"
                        >
                            <ShoppingBag size={20} />
                            Cart
                        </Link>

                        <button className="dashboard-menu">
                            <MapPin size={20} />
                            Addresses
                        </button>

                        <button className="dashboard-menu">
                            ⚙️
                            Account Settings
                        </button>

                    </aside>


                    {/* Main Dashboard */}
                    <div className="dashboard-main">

                        <div className="dashboard-section-header">

                            <h2>Recent Orders</h2>

                            <Link to="/restaurants">
                                Order Again
                            </Link>

                        </div>


                        {/* Order 1 */}
                        <div className="order-card">

                            <div className="order-info">

                                <div className="order-icon">
                                    🍕
                                </div>

                                <div>

                                    <h3>Pizza Hut</h3>

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
                                    Delivered
                                </span>

                            </div>


                            <strong>
                                Rs. 1,250
                            </strong>

                        </div>


                        {/* Order 2 */}
                        <div className="order-card">

                            <div className="order-info">

                                <div className="order-icon">
                                    🍔
                                </div>

                                <div>

                                    <h3>McDonald's</h3>

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
                                    Preparing
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