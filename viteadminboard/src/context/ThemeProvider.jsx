import React, { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    const allThemes = [
      "theme-dark",
      "theme-light",
      "theme-blue",
      "theme-green",
      "theme-red",
      "theme-cyan",
      "theme-magenta",
      "theme-lavender",
    ];
    document.body.classList.remove(...allThemes);
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
