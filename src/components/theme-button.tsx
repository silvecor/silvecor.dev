import clsx from 'clsx';
import Moon from '~icons/ph/moon';
import Sun from '~icons/ph/sun';
import { useTheme } from '@/lib/theme';
import s from './theme-button.module.css';

export function ThemeButton({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type='button'
      className={clsx(s.button, className)}
      onClick={() => { setTheme(resolvedTheme === 'light' ? 'dark' : 'light'); }}
    >
      <Sun data-theme-light />
      <Moon data-theme-dark />
    </button>
  );
}
