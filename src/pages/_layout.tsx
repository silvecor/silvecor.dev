import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { ThemeProvider } from '@/components/theme-provider';
import s from './_layout.module.css';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className={s.container}>
        <header className={s.header}>
          <Nav />
        </header>
        <main className={s.main}>
          <div className={s.mainContent}>
            {children}
          </div>
          <footer className={s.footer}>
            <Footer />
          </footer>
        </main>
      </div>
    </ThemeProvider>
  );
}
