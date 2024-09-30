import { createContext, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from '@/redux/theme/themeSlice.js';

export const DarkModeContext = createContext({
  darkMode: true,
  toggleDarkMode: () => {},
});

export const DarkModeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.themeSlice.darkMode);

  useEffect(() => {
    const metaThemeColor = document.querySelector("meta[name='theme-color']");

    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('color-scheme', 'dark');
      document.documentElement.style.setProperty('background-color', '#171717');
      metaThemeColor?.setAttribute('content', '#171717');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('color-scheme', 'light');
      document.documentElement.style.setProperty('background-color', '#F5F5F5');
      metaThemeColor?.setAttribute('content', '#F5F5F5');
    }
  }, [darkMode]);

  const value = useMemo(() => ({
    darkMode,
    toggleDarkMode: () => dispatch(setDarkMode(!darkMode)),
  }), [darkMode, dispatch]);

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};