import { useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';
export const themeKey: string = 'theme';

export const setThemeInLS = (theme: ThemeMode) =>
  window.localStorage.setItem(themeKey, theme);
export const getThemeFromLS = () =>
  window.localStorage.getItem(themeKey) as ThemeMode;

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(getThemeFromLS() || 'light');

  const setMode = (mode: ThemeMode) => {
    setThemeInLS(mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme = getThemeFromLS();
    const prefersColorSchemeDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersColorSchemeDark && !localTheme) {
      setMode('dark');
    } else if (localTheme) {
      // we skip setting the value in LocalStorage
      // because that's where we got the value from
      setTheme(localTheme);
    } else {
      setMode('light');
    }
  }, []);

  return [theme, toggleTheme] as const;
};
