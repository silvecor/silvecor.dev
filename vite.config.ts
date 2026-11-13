import { execSync } from 'node:child_process';
import { cloudflare } from '@cloudflare/vite-plugin';
import { reactRouter } from '@react-router/dev/vite';
import icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

function getGitCommitSha(): string {
  try {
    return execSync('git rev-parse HEAD', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return 'unknown';
  }
}

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
    cloudflare({
      viteEnvironment: { name: 'ssr' },
    }),
    reactRouter(),
    // react({ compiler: true }),
    icons({
      compiler: 'jsx',
      jsx: 'react',
    }),
  ],
  define: {
    __GIT_COMMIT_SHA__: JSON.stringify(getGitCommitSha()),
  },
});
