// components/ThemeToggle.js
import React from 'react';

function ThemeToggle({ isDarkMode, toggleTheme }) {
  return (
    <div className="theme-toggle">
      <button onClick={toggleTheme}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
}

export default ThemeToggle;