// 没有依赖的模块，使用一个参数的方法
define(function(){
  let name = 'hello requireJs!'
  let getName = function(){
    return name;
  }
  // 直接返回回去，不用挂在window上了
  return {getName};
});