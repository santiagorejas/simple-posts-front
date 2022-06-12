import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ProfileContextProvider from "./context/ProfileContextProvider";
import AuthContextProvider from "./context/AuthContextProvider";
import ThemeContextProvider from "./context/ThemeContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <AuthContextProvider>
            <ProfileContextProvider>
                <ThemeContextProvider>
                    <React.StrictMode>
                        <App />
                    </React.StrictMode>
                </ThemeContextProvider>
            </ProfileContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
);

reportWebVitals();
