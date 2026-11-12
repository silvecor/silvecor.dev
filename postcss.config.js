export default {
  plugins: {
    '@csstools/postcss-global-data': {
      files: [
        './src/styles/vars.css',
      ],
    },
    'postcss-preset-env': {},
    autoprefixer: {},
  },
};
