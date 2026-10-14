import { Button } from '@base-ui/react';
import clsx from 'clsx';
import Moon from '~icons/ph/moon';
import Sun from '~icons/ph/sun';
import { useTheme } from '@/lib/theme';
import s from './theme-button.module.css';

export function ThemeButton({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      className={clsx(s.button, className)}
      onClick={() => { setTheme(resolvedTheme === 'light' ? 'dark' : 'light'); }}
    >
      <Moon className={s.darkIcon} />
      <Sun className={s.lightIcon} />
    </Button>
  );
}
