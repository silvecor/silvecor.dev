import pluginRouter from '@tanstack/eslint-plugin-router';
import silvecor from 'eslint-config-silvecor';

export default silvecor({
  env: {
    browser: true,
    node: true,
  },
  typescript: true,
  react: {
    framework: 'vite',
    reactFastRefresh: {
      allowConstantExport: true,
      allowExportNames: ['Route'],
    },
  },
  format: true,
}).override('silvecor/react', {
  rules: {
    'react/exhaustive-deps': ['warn'],
  },
}).append({
  plugins: {
    '@tanstack/router': pluginRouter,
  },
  rules: {
    '@tanstack/router/create-route-property-order': 'error',
  },
});
