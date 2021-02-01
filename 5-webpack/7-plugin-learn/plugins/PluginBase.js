/**
 * 自定义插件的基本api
 * 需要一个apply方法，参数是complier，能够在这上面注册各种钩子
 * 钩子的种类详见 https://webpack.docschina.org/api/compiler-hooks/#hooks
 */
class PluginBase {
  // webpack在调用插件的时候会调用apply方法，并传入complier
  apply(complier) {
    // emit:AsyncSeriesHook 资源在输出到目标路径前的钩子
    // eslint-disable-next-line
    complier.hooks.emit.tap('PluginBase', (compilation) => {
      console.log('emit:资源输出到目标路径前的钩子！！');
    });
    complier.hooks.emit.tapAsync('PluginBase', (compilation, cb) => {
      console.log('emit(async):异步串行，1秒后后面的钩子才执行！');
      setTimeout(() => {
        cb();
      }, 1000);
    });
    // afterEmit:AsyncSeriesHook 输出到目标路径后的钩子
    complier.hooks.afterEmit.tap('pluginBase', () => {
      console.log('afterEmit:资源输出到目标路径后的钩子！！');
    });
    // done: AsyncSeriesHook ,在 compilation 完成时执行。
    // eslint-disable-next-line
    complier.hooks.done.tap('PluginBase',(stats) => {
      console.log('done:在 compilation 完成时执行');
    });
  }
}
module.exports = PluginBase;
