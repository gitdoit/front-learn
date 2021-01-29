// 暴露出去一个函数，挂在变量上
// 注意这里不再是module.exports,而是exports
// 这是因为node为了方便把exports指向了module.exports
// 后面为了少记点东西，就用module.exports，忘了这个东西吧
exports.foo = function(){
  console.log('这是module3!');
}
exports.arr = [1,2,2,3,4,4,6];