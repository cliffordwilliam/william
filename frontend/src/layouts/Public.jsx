import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logo from "../assets/william-logo.svg";

export default function Private() {
  const links = [
    { name: "Sign up", endpoint: "/register" },
    { name: "Login", endpoint: "/login" },
  ];
  const sections = [
    {
      title: "Navigations",
      links: links,
    },
  ];
  return (
    <>
      <Header links={links} isLogout={false} logo={logo}></Header>
      <Outlet />
      <Footer
        sections={sections}
        logo={logo}
        slogan="Passionate Indonesian fullstack developer."
      ></Footer>
    </>
  );
}
