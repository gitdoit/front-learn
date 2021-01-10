/**
 * 最开始的方式
 * 将函数放到全局环境中，很容易造成命名冲突，污染了全局环境
 */

let msg = '全局function模式-msg'
function foo(){
  console.log('foo:'+msg);
}
function bar(){
  console.log('bar:'+msg);
}