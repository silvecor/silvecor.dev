import 'virtual:uno.css';
import '@/styles/index.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
        <meta name='format-detection' content='telephone=no,email=no,date=no,address=no' />
        <meta name='theme-color' media='(prefers-color-scheme: light)' content='#fcfcfc' />
        <meta name='theme-color' media='(prefers-color-scheme: dark)' content='#121212' />
        <link rel='sitemap' href='/sitemap.xml' />
        <link rel='canonical' href='https://silvecor.dev' />
        <link rel='alternate' type='application/rss+xml' title='silvecor.dev' href='/rss.xml' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

export const getConfig = () => ({ render: 'static' });
