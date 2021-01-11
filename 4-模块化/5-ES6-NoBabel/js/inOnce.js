/**
 * 统一暴露 
 * 推荐这种写法，所有暴露的变量或函数写在尾部，一眼就知道暴露了哪些东西
 */
function foo(){
  console.log('This foo function  is tong yi baolu!');
}
function bar(){
  console.log('This bar function si tong yi baolu!');
}
/**
 * 一个模块就是一个独立的文件，该文件内所有的变量外部都无法直接获取；
 * 如果希望外部能够访问，那么只能通过export暴露这个变量，或者暴露一个方法来进行访问
 */
let arr = [1,2,3,4];


// 通过ES6简写模式统一暴露出去
// 同时还能在暴露的时候改一下名字，这样在引入的时候就可以通过改之后的名字接收了
export {foo,bar,arr as list}
// export let name = 'ok'   没问题,不过导出的是一个常量，没法改
// export arr               报错
// export 1                 报错