'use client';

import { useEffect, useMemo, useState } from 'react';
import { lsKey, type Theme, ThemeContext } from '@/lib/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeState, setThemeState] = useState<Theme>(() => (localStorage.getItem(lsKey) ?? 'auto') as Theme);
  const setTheme = (theme: Theme) => {
    localStorage.setItem(lsKey, theme);
    setThemeState(theme);
  };
  const contextState = useMemo(() => ({ theme: themeState, setTheme }), [themeState]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(themeState === 'auto' ? matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : themeState);
  }, [themeState]);

  return (
    <ThemeContext value={contextState}>
      {children}
    </ThemeContext>
  );
}
