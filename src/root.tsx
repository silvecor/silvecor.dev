import type { ReactNode } from 'react';
import { Links, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { ThemeProvider } from '@/components/theme-provider';
import s from '@/layouts/root.module.css';
import { searchScript } from '@/lib/search';
import { themeScript } from '@/lib/theme';

import '@/styles/index.css';
import 'temml/dist/Temml-Local.css';

export { ErrorBoundary } from '@/components/error-boundary';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='format-detection' content='telephone=no,email=no,date=no,address=no' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
        <meta name='HandheldFriendly' content='True' />
        <meta name='theme-color' media='(prefers-color-scheme: light)' content='#fcfcfc' />
        <meta name='theme-color' media='(prefers-color-scheme: dark)' content='#121212' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='canonical' href='https://silvecor.dev' />
        <link rel='sitemap' href='/sitemap.xml' />
        <link rel='alternate' href='/rss.xml' type='application/rss+xml' title='silvecor.dev' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital@0;1&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Noto+Sans+JP:wght@100..900&family=Noto+Sans+SC:wght@100..900&display=swap' />
        <Links />
        <script>{themeScript}</script>
      </head>

      <body>
        <ThemeProvider>
          <div className={s.container}>
            <header className={s.header}>
              <Nav />
            </header>
            <main className={s.main} id='scrollable-area'>
              <div className={s.mainContent}>
                {children}
              </div>
              <footer className={s.footer}>
                <Footer />
              </footer>
            </main>
          </div>
        </ThemeProvider>

        <ScrollRestoration />
        <Scripts />

        <script>{searchScript}</script>
      </body>
    </html>
  );
}

export default function app() {
  return <Outlet />;
}
