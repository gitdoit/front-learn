const path = require('path');

module.exports = {
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        // 对js文件使用我们自定义的loader
        // loader: 'loader1',
        // use: [
        //   '1-loader',
        //   '2-loader',
        //   '3-async-loader',
        //   {
        //     loader: '4-options-loader',
        //     options: {
        //       name: true,
        //     },
        //   },
        // ],
        loader: '5-bable-loaders',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  resolveLoader: {
    // 指示webpack在打包的时候去哪里找loaders
    // 这就是我们再配置第三方loader的时候只写一个名字就能生效的原因
    modules: [
      // 默认去这下面找
      'node_modules',
      // 然后再去我们自己的目录去找
      path.resolve(__dirname, 'loaders'),
    ],
  },
};
