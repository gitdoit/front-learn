/**
 * 分散暴露，一个函数export一次；
 * 不推荐这种写法，因为代码一多就不知道暴露了哪些东西
 */

export let num = 0;

export function incr(){
 return  num++;
}

export function foo(){
  console.log('分散暴露foo...');
}
export function bar(){
  console.log('分散暴露bar...');
}