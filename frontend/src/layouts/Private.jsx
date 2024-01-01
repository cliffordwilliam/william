import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logo from "../assets/william-logo.svg";
import c from "../c.js";

export default function Private() {
  const links = [
    { name: "Home", endpoint: "/" },
    { name: "Spotify", endpoint: c.baseSpotifyUrl },
    { name: "Scrapper", endpoint: "/scrapper" },
    { name: "Youtube", endpoint: "/youtube" },
  ];
  const sections = [
    {
      title: "Navigations",
      links: links,
    },
  ];
  return (
    <>
      <Header links={links} isLogout={true} logo={logo}></Header>
      <Outlet />
      <Footer
        sections={sections}
        logo={logo}
        slogan="Passionate Indonesian fullstack developer."
      ></Footer>
    </>
  );
}
