import { defineConfig, presetIcons, presetWind3 } from 'unocss';

const radixColors = ['gray', 'blue', 'red', 'orange', 'green', 'teal', 'purple'];

export default defineConfig({
  presets: [
    presetWind3({
      dark: 'class',
      preflights: true,
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
        /\.(tsx?|mdx?|html)($|\?)/,
      ],
      exclude: [
        /node_modules/,
        /dist/,
      ],
    },
  },
  rules: [
    ['scrollbar-none', { 'scrollbar-width': 'none', '-ms-overflow-style': 'none' }],
  ],
  extendTheme: theme => {
    const colors = radixColors.reduce<Record<string, string>>((acc, color) => {
      for (let i = 1; i <= 12; ++i) {
        acc[`${color}-${i}`] = `var(--${color}-${i})`;
      }
      return acc;
    }, {});

    return {
      ...theme,
      colors,
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
    };
  },
});
