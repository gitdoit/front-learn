// 定义模块下的私有变量
let a = 10;
let b = 20;
let c = 30;
// 私有函数
function show() {
    console.info("hello")
}
// 默认导出，当导入方没有指定导入功能，则默认导出a,b,show
export default {
    a,b,show
}
// 一个模块只允许一个export default，否则报错
//export default { c }

// 按需导出，导入方需要指定导入下面几个变量才能接收到
export let s1 = 'aaa';
export let s2 = 'bbb';
export let s3 = 'ccc';
export  function say() {
    console.info("hi~")
}
