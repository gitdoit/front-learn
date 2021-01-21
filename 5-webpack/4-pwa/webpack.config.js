const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

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
  plugins: [
    // 每次打包，清空dist
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      {
        template: './src/index.html',
        filename: 'index.html',
      },
    ),
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1. 帮助serviceworker快速启动
        2. 删除旧的 serviceworker
        生成一个 serviceworker 配置文件~
      */
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  module: {
    rules: [

      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // babel
          {
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
                    corejs: '3',
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
          // eslint，要比babel高
          {
            loader: 'eslint-loader',
            options: {
              // 自动修复eslint的错误
              fix: true,
            },
          },
        ],
      },
    ],
  },
};
