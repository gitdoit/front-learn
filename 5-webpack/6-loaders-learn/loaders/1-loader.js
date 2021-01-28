/**
 * 自定义的loadder
 * @param {*} content 输入的文件内容
 * @param {*} map 不知道
 * @param {*} mete 不知道
 */
// eslint-disable-next-line
module.exports = function (content,map,mete) {
  // 就打印一下
  console.log(111);
  // 直接返回
  return content;
};
// 这个方法会在打包的时候按照定义顺序去正序执行，上面的那个逆序
module.exports.pitch = function () {
  console.log('pitch 111');
};
