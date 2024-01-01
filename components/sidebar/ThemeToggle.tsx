'use client';

// Libs
import { useState } from 'react';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

const THEMES = {
  LIGHT: 'fantasy',
  DARK: 'dracula',
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(THEMES.LIGHT);

  const toggleTheme = () => {
    const newTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button className="btn btn-sm btn-outline" onClick={toggleTheme}>
      {theme === THEMES.LIGHT ? <BsMoonFill className="h-4 w-4" /> : <BsSunFill className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle;
