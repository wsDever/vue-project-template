module.exports = {
  // parser: 'sugarss',
  plugins: {
    'postcss-pxtorem': {
      rootValue: 17.9,
      unitPrecision: 2,
      propWhiteList: ['*'],
      selectorBlackList: ['.no-rem'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    },
    autoprefixer: {
      overrideBrowserslist: ['iOS >= 8', 'Android >= 4']
    }
  }
};
