function saySomething(){
  console.log('Hello there~');
}

function byDefault(){
  console.log('我是默认导出的函数！');
}
// 统一暴露出去
export {saySomething,byDefault}
// 为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。
// 由于是默认输出，所以一个模块只能有一个default
// 在引入的地方 import anyName from 'xxx.js';anyName(); 
export default byDefault;
// default本质上是一个变量，所以下面这种写法没问题，意思是将42赋给defualt再暴露出去
// export default 42;