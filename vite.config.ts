import { cloudflare } from '@cloudflare/vite-plugin';
import { velite } from '@silvecor/vite-plugin-velite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    velite(),
    cloudflare({
      viteEnvironment: { name: 'ssr' },
    }),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
      sitemap: {
        enabled: true,
        host: 'https://silvecor.dev',
      },
    }),
    react({ compiler: true }),
    icons({
      compiler: 'jsx',
      jsx: 'react',
    }),
  ],
});
