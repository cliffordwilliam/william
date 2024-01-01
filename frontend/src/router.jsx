import React from "react";
// router
import { createBrowserRouter, redirect } from "react-router-dom";
// layout
import Private from "./layouts/Private.jsx";
import Public from "./layouts/Public.jsx";
import Global from "./layouts/Global.jsx";
// pages
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Spotify from "./pages/Spotify.jsx";

const router = createBrowserRouter([
  {
    element: <Global />,
    children: [
      {
        element: <Private />,
        loader: () => {
          // if (!localStorage.token) {
          //   return redirect("/register");
          // }
          return null;
        },
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/spotify",
            element: <Spotify />,
          },
        ],
      },
      {
        element: <Public />,
        children: [
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
