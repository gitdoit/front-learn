/**
 * 自定义的loadder
 * @param {*} content 输入的文件内容
 * @param {*} map 不知道
 * @param {*} mete 不知道
 */
// eslint-disable-next-line
module.exports = function (content,map,mete) {
  // 就打印一下
  console.log(2222);
  // 直接返回
  return content;
};
module.exports.pitch = function () {
  console.log('pitch 222');
};
