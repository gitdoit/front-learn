// 想要获取配置loader是给的options需要安装下面开发依赖
// eslint-disable-next-line
const { getOptions } = require('loader-utils');
// eslint-disable-next-line
const { validate } = require('schema-utils');

const schema = require('./schemas/option-demo-schema');

module.exports = function (content) {
  // 通过这个方法读取当前loader配置时的参数，
  const options = getOptions(this);
  // 根据schema校验配置文件，不要让用户乱填
  validate(schema, options, {
    name: 'loader3',
    // schema的配置文件中没有配置这个属性
    // 但是由于 addtionalProperties:true 所以可以添加额外的
    age: 13,
  });
  console.log('options-loader读取到的配置：', options);
  return content;
};
