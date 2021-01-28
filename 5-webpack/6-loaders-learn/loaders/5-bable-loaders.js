const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');
const babel = require('@babel/core');
const util = require('util');

const schema = require('./schemas/babel-demo-schema');
// babel.transform是一个普通异步的编译代码的方法
// 使用util.promisify转换成promise方法
const transform = util.promisify(babel.transform);

module.exports = function (content, maps, meta) {
  const options = getOptions(this) || {};
  // 校验配置文件
  validate(schema, options, {
    name: 'babel-loader',
  });
  // 异步
  const callback = this.async();
  transform(content, options)
    .then(({ code, map }) => callback(null, code, map, meta))
    .catch((e) => callback(e));
};
