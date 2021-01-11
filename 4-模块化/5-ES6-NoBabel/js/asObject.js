function hello(){
  console.log("使用 import * as obj from 'xxx.js' 来将模块内所有的导出放在一个对象上。");
}
function bye(){
  console.log('这样会将导出所有内容！');
}
export {hello,bye}