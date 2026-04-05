import defineConfig from '@hellolin-eslint/config';

export default defineConfig({
  env: {
    browser: true,
    node: true,
  },
  react: {
    next: true,
    reactCompiler: true,
  },
});
