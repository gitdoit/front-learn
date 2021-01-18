const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].[contenthash:10].js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },
  // 生成sourceMap,快速定位报错地点
  devtool: 'eval-source-map',
  plugins: [
    // 每次打包，清空dist
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      {
        template: './src/index.html',
        filename: 'index.html',
      },
    ),
    new MiniCssExtractPlugin({
      filename: 'css/build.[contenthash:10].css',
    }),
    new ESLintPlugin({
      fix: true,
      extensions: 'js',
    }),
  ],
  module: {
    rules: [
      // 【eslint-loader已过期】前端各种过期，真是服了
      // 默认命中一个loader之后如果后面还有其他loader
      // 那么这个文件会继续test，不会breake
      {},
      {
        // 一个文件只会被下面多个loader命中一次
        // 相当于循环里面的break
        oneOf: [
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader', {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: ['postcss-preset-env'],
                  },
                },
              }],
          },
          {
            test: /\.less$/,
            use: [
              'style-loader',
              'css-loader',
              'less-loader',
            ],
          },
          {
            test: /\.jpg|png|gif|bmp$/,
            use: {
              loader: 'url-loader',
              options: {
                name: '[hash:10].[ext]',
                limit: 1 * 1024,
                esModule: false,
                outputPath: 'imgs',
              },
            },
          },
          {
            test: /\.html$/,
            use: ['html-loader'],
          },
          {
            exclude: /\.(css|less|js|html|vue)$/,
            loader: 'file-loader',
            options: {
              name: '[hash:10].[ext]',
              outputPath: 'imgs',
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        edge: '17',
                        firefox: '60',
                        chrome: '67',
                        safari: '11.1',
                      },
                      useBuiltIns: 'usage',
                    },
                  ],
                ],
                plugins: [[
                  '@babel/plugin-transform-runtime',
                  {
                    corejs: '3',
                  },
                ], '@babel/plugin-proposal-class-properties'],
                // 开启构建缓存，性能提升
                cacheDirectory: true,
              },
            },
          },
        ],
      },
    ],
  },
};
