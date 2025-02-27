// src/components/ThemeToggle.js
import React from "react";
import "../styles/ThemeToggle.css";

function ThemeToggle({ isDarkMode, toggleTheme }) {
  return (
    <div className="theme-toggle-container">
      <button
        className="theme-toggle-button"
        onClick={toggleTheme}
        aria-label={isDarkMode ? "Bytt til lyst tema" : "Bytt til mørkt tema"}
      >
        {isDarkMode ? (
          <span role="img" aria-label="Lyst tema">
            ☀️
          </span>
        ) : (
          <span role="img" aria-label="Mørkt tema">
            🌙
          </span>
        )}
      </button>
    </div>
  );
}

export default ThemeToggle;
