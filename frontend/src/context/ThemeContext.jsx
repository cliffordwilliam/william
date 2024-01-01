import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const themeContext = createContext({
  currentTheme: "dark",
  handleTheme: () => {},
  theme: {
    light: {
      dataTheme: "light",
    },
    dark: {
      dataTheme: "dark",
    },
  },
});

export default function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("dark");

  function handleTheme() {
    if (currentTheme == "light") setCurrentTheme("dark");
    else setCurrentTheme("light");
  }

  return (
    <themeContext.Provider
      value={{
        currentTheme,
        handleTheme,
        theme: {
          light: {
            dataTheme: "light",
          },
          dark: {
            dataTheme: "dark",
          },
        },
      }}
    >
      {children}
    </themeContext.Provider>
  );
}
