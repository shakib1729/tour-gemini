'use client';

// Libs
import { useEffect, useState } from 'react';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

const THEMES = {
  LIGHT: 'fantasy',
  DARK: 'dracula',
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tour-gemini-theme') ?? THEMES.LIGHT;
    }
    return THEMES.LIGHT;
  });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    localStorage.setItem('tour-gemini-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    setTheme(newTheme);
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <button className="btn btn-sm btn-outline" onClick={toggleTheme}>
      {theme === THEMES.LIGHT ? <BsMoonFill className="h-4 w-4" /> : <BsSunFill className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle;
