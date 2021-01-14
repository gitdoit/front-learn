const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./src/index.js', './src/index.html'],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './src/index.html',
        filename: 'index.html',
      },
    ),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['postcss-preset-env'],
            },
          },
        }],
      },
      {
        // 处理 html 中 img 资源
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
};
