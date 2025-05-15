// useDarkMode.ts
import { useState, useEffect } from 'react';

export const useDarkMode = (): [boolean, () => void] => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Check for saved preference or system preference on initial load
  useEffect(() => {
    const savedPreference = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedPreference === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedPreference === null && prefersDark) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode.toString());
      
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newMode;
    });
  };

  return [darkMode, toggleDarkMode];
};

export default useDarkMode;