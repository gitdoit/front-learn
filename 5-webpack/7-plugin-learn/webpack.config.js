// const PluginBase = require('./plugins/PluginBase');
// const PluginAddAsset1 = require('./plugins/PluginAddAsset1');
// const PluginAddAsset2 = require('./plugins/PluginAddAsset2');
const MyCopyPlug = require('./plugins/MyCopyPlugin');

module.exports = {
  plugins: [
    // new PluginBase(),
    // new PluginAddAsset2(),
    new MyCopyPlug({
      from: 'public',
      to: 'css',
      ignore: ['**/index.html'],
    }),
  ],
};
