const fs = require('fs');

const util = require('util');
const path = require('path');
const { RawSource } = require('webpack-sources');

const readFile = util.promisify(fs.readFile);

class PluginAddAsset2 {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('PluginAddAsset2', (compilation) => {
      compilation.hooks.additionalAssets.tapAsync('PluginAddAsset2', async (cb) => {
        const data = await readFile(path.resolve(__dirname, '../info.txt'));
        // eslint-disable-next-line
        compilation.assets['info.txt'] = new RawSource(data);
        // 等价
        // compilation.emitAsset('info.txt',new RawSource(data));
        cb();
      });
    });
  }
}
module.exports = PluginAddAsset2;
