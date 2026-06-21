import silvecor from 'eslint-config-silvecor';

export default silvecor({
  env: {
    browser: true,
    node: true,
  },
  typescript: true,
  react: {
    framework: 'reactRouter',
    rsc: true,
  },
  format: true,
});
