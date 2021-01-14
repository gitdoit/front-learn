// require是nodejs内置的函数
// path模块也是内置的，专门操作路径的
const path = require('path');

// 打包插件，用来处理html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 处理CSS文件，提取成单独的文件而不是让style-loader把样式放在style标签里
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// css压缩插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prdEnvFlag = process.env.NODE_ENV === 'production';
module.exports = {
  // 开发模式，代码不压缩
  mode: prdEnvFlag ? 'production' : 'development',
  // _dirname是当前项目的根的绝对路径,指定打包入口，使用index.js作为打包入口
  entry: path.join(__dirname, './src/index.js'),
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true,
  },
  output: {
    // 输出文件的存放位置即当前项目根路径下的dist文件夹内
    // __dirname是nodeJs的内置变量，代表当前文件所在文件夹的绝对路径
    path: path.join(__dirname, 'dist'),
    // 出输的文件名称
    filename: 'js/bundle.js',
  },
  // 配置打包过程中需要用到的插件
  plugins: [
    // 处理html
    new HtmlWebpackPlugin(
      {
        template: './src/index.html',
        filename: 'index.html',
        minify: {
          // 移除空格
          collapseWhitespace: true,
          // 移除注释
          removeComments: true,
        },
      },
    ),
    // 处理CSS
    new MiniCssExtractPlugin({
      filename: 'css/build.css',
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        map: {
          inline: false,
          annotation: true,
        },
      },
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    }),
  ],
  // weboack默认只能处理js文件
  // 我们打包的时候会有css等，需要loader来处理这些东西
  module: {
    // 配置规则，处理各种文件依赖
    rules: [
      // 处理css文件的loader
      {
        test: /\.css$/,
        use: [
          // 这个loader只能把css放在页面的style标签里
          // 'style-loader',

          // 这个可以提取成一个单独的css文件并引入
          MiniCssExtractPlugin.loader,

          // 将样式文件加载到js里
          'css-loader',

          // css兼容性处理
          'postcss-loader',
        ],
      },
      // 处理less的loader
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      // 针对图片引用做base64转码，并处理图片url
      {
        test: /\.jpg|png|gif|bmp$/,
        use: {
          loader: 'url-loader',
          options: {
            // 文件名取图片hash值前10位
            name: '[hash:10].[ext]',
            // 当图片小于1kb时，将图片转为base64，这样减少网络请求
            limit: 1 * 1024,
            // url-loader默认使用es6的模块化语法
            // 而html-loader使用commonJs的模块化语法，会有冲突，关掉这个
            esModule: false,
            // 打包后输出位置
            outputPath: 'imgs',
          },
        },
      },
      // 处理html中img标签引入的图片，从而能被url-loader处理
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      // 其他资源引用处理，使用file-loader
      {
        exclude: /\.(css|less|js|html|vue)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
        },
      },
      // 使用babel处理高级JS语法
      {
        // 处理js
        test: /\.js$/,
        // 使用babel-loader
        use: 'babel-loader',
        // 排除模块目录
        exclude: /node_modules/,
      },
      {
        loader: 'eslint-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        options: {
          // 自动修复
          fix: true,
        },
      },
    ],
  },
};
