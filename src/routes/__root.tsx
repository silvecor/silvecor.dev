import { createRootRoute, HeadContent, Outlet, ScriptOnce, Scripts } from '@tanstack/react-router';
import { ErrorBoundary } from '@/components/error-boundary';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { NotFound } from '@/components/not-found';
import { ThemeProvider } from '@/components/theme-provider';
import { searchScript } from '@/lib/search';
import { themeScript } from '@/lib/theme';

import s from './__root.module.css';
import '@/styles/index.css';
import 'temml/dist/Temml-Local.css';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { title: 'silvecor.dev' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no,email=no,date=no,address=no' },
      { httpEquiv: 'Content-Type', content: 'text/html; charset=utf-8' },
      { httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { name: 'HandheldFriendly', content: 'True' },
      // theme
      { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#fcfcfc' },
      { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#121212' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'canonical', href: 'https://silvecor.dev' },
      { rel: 'sitemap', href: '/sitemap.xml' },
      { rel: 'alternate', href: '/rss.xml', type: 'application/rss+xml', title: 'silvecor.dev' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital@0;1&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Noto+Sans+JP:wght@100..900&family=Noto+Sans+SC:wght@100..900&display=swap' },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorBoundary,
});

function RootComponent() {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <HeadContent />
        <ScriptOnce children={themeScript} />
        <ScriptOnce children={searchScript} />
      </head>
      <body>
        <ThemeProvider>
          <div className={s.container}>
            <header className={s.header}>
              <Nav />
            </header>
            <main className={s.main} id='scrollable-area'>
              <div className={s.mainContent}>
                <Outlet />
              </div>
              <footer className={s.footer}>
                <Footer />
              </footer>
            </main>
          </div>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
