const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const filename = (ext) => `[name].[fullhash].${ext}`;

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', './dist'),
    filename: filename('js'),
    chunkFilename: 'vendor.[fullhash].js',
    publicPath: '/',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
