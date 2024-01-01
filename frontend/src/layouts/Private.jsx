import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logo from "../assets/william-logo.svg";

export default function Private() {
  const links = [{ name: "Home", endpoint: "/" }];
  return (
    <>
      <Header links={links} isLogout={true} logo={logo}></Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
}
