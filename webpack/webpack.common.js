const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    { loader: 'css-loader', options: { importLoaders: 2 } },
  ];

  loaders.push('postcss-loader');

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};
module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.png', '.json', '.svg'],
    enforceExtension: false,
    mainFiles: ['index'],
    alias: {
      src: path.resolve(__dirname, 'src/'),
      '@src': path.resolve(__dirname, '../src'),
      '@styles': path.resolve(__dirname, '../src/scss'),
      '@hooks': path.resolve(__dirname, '../src/utility/hooks'),
      '@configs': path.resolve(__dirname, '../src/configs'),
      '@layouts': path.resolve(__dirname, '../src/layouts'),
      '@store': path.resolve(__dirname, '../src/redux'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@utils': path.resolve(__dirname, '../src/utility/Utils'),
    },
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
    },
  },
  devServer: {
    port: 1000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/robots.txt', to: 'robots.txt' },
        { from: 'public/favicon.ico', to: 'favicon.ico' },
        { from: 'public/manifest.json', to: 'manifest.json' },
        { from: 'public/assets', to: 'assets' },
      ],
    }),
  ],
  stats: 'errors-only',
};
