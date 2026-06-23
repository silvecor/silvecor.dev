import react from '@vitejs/plugin-react';
import mdx from 'fumadocs-mdx/vite';
import unocss from 'unocss/vite';
import { defineConfig } from 'waku/config';

export default defineConfig({
  vite: {
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
      external: ['@takumi-rs/image-response'],
      dedupe: ['waku'],
    },
    plugins: [
      mdx(),
      react(),
      unocss(),
    ],
  },
});
