import { cloudflare } from '@cloudflare/vite-plugin';
import react from '@vitejs/plugin-react';
import mdx from 'fumadocs-mdx/vite';
import icons from 'unplugin-icons/vite';
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
      dedupe: ['waku'],
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
    plugins: [
      mdx(),
      react({ compiler: true }),
      icons({
        compiler: 'jsx',
        jsx: 'react',
      }),
      cloudflare({
        viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
        inspectorPort: false,
      }),
    ],
  },
});
