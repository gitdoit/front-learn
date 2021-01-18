const presets = [
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
];

const plugins = [
  [
    '@babel/plugin-transform-runtime',
    {
      absoluteRuntime: false,
      corejs: 3, // 标准库3，需要安装好
      helpers: true,
      regenerator: true,
      useESModules: false,
      // 默认不支持编译提案的api，可以配置true开启
      proposals: false,
    },
  ],
  ['@babel/plugin-proposal-class-properties'],
];
module.exports = { presets, plugins };
