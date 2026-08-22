import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Layout from "./Components/layout";

import { useSelector } from "react-redux";

import Home from "./Pages/Home";
import Restaurants from "./Pages/Restaurants";
import Favorites from "./Pages/Favorites";
import Cart from "./Pages/Cart";
import RestaurantDetails from "./Pages/RestaurantDetails";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {

  const theme = useSelector((state) => state.theme.theme);

  return (
    <BrowserRouter>

      <div className={theme === "dark" ? "dark-theme" : "light-theme"}>

        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/restaurants"
              element={<Restaurants />}
            />

            <Route
              path="/restaurants/:id"
              element={<RestaurantDetails />}
            />

            <Route
              path="/favorites"
              element={<Favorites />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

          </Route>
        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;
