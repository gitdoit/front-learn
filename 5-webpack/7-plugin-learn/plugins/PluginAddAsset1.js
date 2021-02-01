/**
 * 在构建的时候创建额外的asset，例如可以下载图像资源替换url引用
 * 或者是其他的一些骚操作
 * 利用的是compilation的addtionalAssets
 */
class PluginAddAsset1 {
  apply(complier) {
    // thisCompilation：SyncHook，初始化 compilation 时调用，在触发 compilation 事件之前调用
    complier.hooks.thisCompilation.tap('PluginAddAsset1', (compilation) => {
      // additionalAssets：AsyncSeriesHook，为 compilation 创建额外 asset
      compilation.hooks.additionalAssets.tapAsync('PluginAddAsset', (cb) => {
        const content = 'hello additionaleAssets Hook!';
        // eslint-disable-next-line
        compilation.assets['bycode.txt'] = {
          size() {
            return content.length;
          },
          source() {
            return content;
          },
        };
        // 回调
        cb();
      });
    });
  }
}
module.exports = PluginAddAsset1;
