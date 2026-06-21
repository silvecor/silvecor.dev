import { cloudflare } from '@cloudflare/vite-plugin';
import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';
import { defineConfig } from 'waku/config';

export default defineConfig({
  vite: {
    plugins: [
      unocss(),
      react(),
      cloudflare({
        viteEnvironment: {
          name: 'rsc',
          childEnvironments: ['ssr'],
        },
        inspectorPort: false,
      }),
    ],
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
