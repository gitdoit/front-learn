const fs = require('fs');

const util = require('util');
const { validate } = require('schema-utils');
// 文件过滤库
const globby = require('globby');
const path = require('path');
const { RawSource } = require('webpack-sources');
const shcema = require('./schema.json');

const readFile = util.promisify(fs.readFile);
class MyCopyPlugin {
  constructor(options = {}) {
    validate(shcema, options, {
      name: 'MyCopyPlugin',
    });
    // 验证
    this.options = options;
  }

  apply(compiler) {
    // 初始化compilation时的钩子
    compiler.hooks.thisCompilation.tap('MyCopyPlug', (compilation) => {
      compilation.hooks.additionalAssets.tapAsync('MyCopyPlugin', async (cb) => {
        // 1、读取from下资源
        const { from, to = '.', ignore } = this.options;
        // 获取运行执行的目录
        const { context } = compiler.options;
        // 判断from是否为绝对路径，不是的话处理成绝对路径
        // 这里有个坑，就是路径分隔符，这个插件不支持 \ 斜杠，也就是不支持windows平台的分隔符
        const absoluteFrom = path.isAbsolute(from) ? from : path.posix.join(context.split(path.sep).join('/'), from);
        console.log(absoluteFrom);
        // 2、过滤
        const paths = await globby(absoluteFrom, { ignore });
        // 3、格式化
        await Promise.all(
          paths.map(async (absolutePath) => {
            const data = await readFile(absolutePath);
            const source = new RawSource(data);
            // 输出到to文件夹下
            const filename = path.join(to, path.basename(absolutePath));
            compilation.emitAsset(filename, source);
            return {
              data,
              filename,
            };
          }),
        );
        cb();
      });
    });
  }
}
module.exports = MyCopyPlugin;
