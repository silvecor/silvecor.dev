import { useCallback, useEffect, useMemo, useState } from 'react';
import { lsKey, type ResolvedTheme, type Theme, ThemeContext } from '@/lib/theme';

const isServer = typeof window === 'undefined';

function getTheme(): Theme {
  if (isServer) return 'light';
  return (localStorage.getItem(lsKey) ?? 'auto') as Theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeState, setThemeState] = useState<Theme>(getTheme);
  const getResolvedTheme = useCallback(
    (): ResolvedTheme => themeState === 'auto' ? matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : themeState,
    [themeState],
  );

  const setTheme = (theme: Theme) => {
    localStorage.setItem(lsKey, theme);
    setThemeState(theme);
  };
  const contextState = useMemo(() => ({
    theme: themeState,
    resolvedTheme: getResolvedTheme(),
    setTheme,
  }), [getResolvedTheme, themeState]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(getResolvedTheme());
  }, [getResolvedTheme, themeState]);

  return (
    <ThemeContext value={contextState}>
      {children}
    </ThemeContext>
  );
}
