module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.markdown$/,
          use: 'raw-loader'
        }
      ]
    }
  }
};
