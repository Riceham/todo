"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export const ThemeSwitch = () => {
  // Use the theme context to access the current theme and the toggleTheme function
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <button
      type="button"
      className="fixed bottom-14 right-14 bg-gray-200 dark:bg-gray-800 w-[3.5rem] h-[3.5rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-gray-700 dark:border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all"
      onClick={toggleTheme} // Toggle the theme when the button is clicked
      aria-label="Toggle Dark/Light mode"
      title="Toggle Dark/Light mode"
    >
      {theme === "light" ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}{" "}
      {/* Render sun or moon icon based on the current theme */}
    </button>
  );
};
