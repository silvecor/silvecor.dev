import { defineConfig, presetIcons, presetWind4 } from 'unocss';

export default defineConfig({
  presets: [
    presetWind4({
      dark: {
        light: '[data-theme="light"]',
        dark: '[data-theme="dark"]',
      },
      preflight: 'on-demand',
    }),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        ph: () => import('@iconify-json/ph/icons.json').then(i => i.default),
      },
    }),
  ],
  content: {
    pipeline: {
      include: [
        /\.([jt]sx?|mdx?|html|css)($|\?)/,
      ],
    },
    filesystem: [
      '**/*.{html,md,mdx,js,ts,jsx,tsx,css}',
    ],
  },
});
