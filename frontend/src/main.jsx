
import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import App from "./App";
import store from "./redux/store";
import "./i18n/i18n";

import "./App.css";
import "./Styles/Urdu.css";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

        <Provider store={store}>
            <App />
        </Provider>

    </React.StrictMode>

);

// import React from "react";
// import ReactDOM from "react-dom/client";

// import App from "./App";
// import CartProvider from "./Context/CartContext";

// import "./App.css";

{/* <AuthProvider>

            <CartProvider>

                <ThemeProvider>

                    <App />

                </ThemeProvider>

            </CartProvider>

        </AuthProvider> */}