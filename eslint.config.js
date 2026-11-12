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
    // reactFastRefresh: {
    //   allowConstantExport: true,
    //   allowExportNames: ['Route'],
    // },
    reactFastRefresh: false, // temporarily disabled for TanStack Start compatibility
  },
  format: true,
}).override('silvecor/typescript/type-aware', {
  rules: {
    'ts/no-confusing-void-expression': 'off',
    'ts/only-throw-error': ['error', { allow: ['NotFoundError'] }],
  },
}).override('silvecor/typescript/style', {
  rules: {
    'style/type-annotation-spacing': 'off', // FIXME
  },
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
