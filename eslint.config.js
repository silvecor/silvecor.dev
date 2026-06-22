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
      allowExportNames: ['getConfig'],
    },
    rsc: true,
  },
  format: true,
});
