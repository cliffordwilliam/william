import React from "react";
import { Outlet } from "react-router-dom";
import Dialog from "../components/Dialog";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";

export default function Global() {
  const { currentTheme, theme } = useContext(themeContext);
  return (
    <div className="theme-con" data-theme={theme[currentTheme].dataTheme}>
      <Dialog />
      <Outlet />
    </div>
  );
}
