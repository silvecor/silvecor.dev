import { cloudflare } from '@cloudflare/vite-plugin';
import react from '@vitejs/plugin-react';
import mdx from 'fumadocs-mdx/vite';
import unocss from 'unocss/vite';
import { defineConfig } from 'waku/config';

export default defineConfig({
  vite: {
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      unocss(),
      mdx(),
      react(),
      cloudflare({
        viteEnvironment: {
          name: 'rsc',
          childEnvironments: ['ssr'],
        },
        inspectorPort: false,
      }),
    ],
    ssr: {
      external: ['@takumi-rs/image-response'],
    },
    environments: {
      rsc: {
        optimizeDeps: {
          include: ['hono/tiny'],
        },
        build: {
          rolldownOptions: {
            platform: 'neutral',
          },
        },
      },
      ssr: {
        optimizeDeps: {
          include: ['waku > rsc-html-stream/server'],
        },
        build: {
          rolldownOptions: {
            platform: 'neutral',
          },
        },
      },
    },
  },
});
