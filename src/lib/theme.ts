import { createContext, use } from 'react';

export const lsKey = 'theme';

export const themeScript = `
(function () {
let rt = document.documentElement;
let apply = (t) => {
  rt.classList.remove('light', 'dark');
  rt.classList.add(t);
};
let st = localStorage.getItem('${lsKey}');
if (!st) {
  st = 'auto';
  localStorage.setItem('${lsKey}', st);
}
let qr = matchMedia('(prefers-color-scheme: dark)');
apply(st !== 'auto' ? st : qr.matches ? 'dark' : 'light');
qr.addEventListener('change', (e) => {
  st = localStorage.getItem('${lsKey}');
  if (st !== 'auto') return;
  apply(qr.matches ? 'dark' : 'light');
});
})();
`;

export type Theme = 'auto' | 'light' | 'dark';
export type ResolvedTheme = Exclude<Theme, 'auto'>;

interface ThemeContextState {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  // eslint-disable-next-line style/type-annotation-spacing
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextState>({
  theme: 'auto',
  resolvedTheme: 'light',
  setTheme: () => {},
});

export function useTheme() {
  return use(ThemeContext);
}
