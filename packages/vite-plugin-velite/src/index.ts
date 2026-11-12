import type { Plugin } from 'vite';
import { build } from 'velite';

export function velite(): Plugin {
  let running = false;
  let dev = false;
  return {
    name: '@silvecor/vite-plugin-velite',
    enforce: 'pre',
    configResolved: config => {
      dev = config.mode === 'development';
    },
    buildStart: async () => {
      if (running) return;
      running = true;

      await build({
        clean: !dev,
        watch: dev,
      });
    },
  };
}
