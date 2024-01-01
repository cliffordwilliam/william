import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// router
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
// store
import { Provider } from "react-redux";
import { store } from "./store";
// theme
import ThemeProvider from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
);
