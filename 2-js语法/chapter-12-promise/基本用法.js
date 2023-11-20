/**
 * 目录：
 *  1.基本用法
 *  2.then方法
 *  3.返回另一个Promise
 *  4.async和await对Promise的影响
 * 
 * 
 * Promise和Java里面的Future有点类似，就是包装一个异步操作
 * 未来某个时间点才会有结果
 * 1、Promise就像他的语义“承诺”一样，Promise对象的状态不会受到外部的影响而改变
 *    他的三种状态pending执行中、fulfilled已成功、rejected已失败只取决于异步结果。
 * 2、持久性、状态一旦改变就不会再变，此时称为已定型(resolved)
 *     
            +--------------+
            |   pending    |
            +--+------+--+-+
            ^  |      |  ^
            |  |      |  |
           XXX |      | XXX
            |  v      v  |
      +------+--+-+   ++--+---------+
      | fulfilled |   |  rejected   |
      +-----------+   +-------------+
 *  如果在resolved状态下再添加回调函数，此时会立即得到结果；
 * Promise一旦建立就会立即执行，不能中途取消。
 * 
 * 3、当处于pending状态时无法得知进展到哪个阶段
 *  
 * 
 */

/* ***********************************基本用法**************************************************** */
// Promise构造函数有两个参数，由js引擎提供
// 一旦调用了resolve函数则，Promise的状态就会变成已完成
// 一旦调用了reject函数，则Promise的状态就会变成已失败
// 两个回调函数都可以接收参数，用来返回异步操作后的结果，可以在后面的then中接收到
new Promise((resolve, reject) => {
  // Promise一旦建立，就会立即执行
  console.log('1');
  setTimeout(resolve, 3000, '2');
}).then(value => {
  // 在状态变为resolved后就执行then
  console.log(value);
})


/* ***********************************then方法**************************************************** */
// then方法可以接收两个参数
new Promise((resolve, reject) => {
  const rand = Math.floor(Math.random() * 10);
  if ((rand % 2) === 0) {
    resolve(rand)
  }else{
    reject(new Error(rand))
  }
}).then((ok) => {
  console.log('随机到偶数了:'+ok);
},(nook) => {
  console.error('随机到奇数了',nook);
})


/* ***********************************返回另一个Promise**************************************************** */
// 在resolve或者reject中返回另一个Promise
// 此时原来的Promise的状态就取决于另一个Promise
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})
const p2 = new Promise(function (resolve, reject) {
  // 由于返回的是p1，则即使调用了resolve状态也不会变成已完成
  // 会根据p1的返回结果来决定自身的状态，有点像短路？
  setTimeout(() => resolve(p1), 1000)
})
p2
  .then(result => console.log(result))
  .catch(error => console.log(error))// 由于p1返回reject，这里总会执行
// Error: fail

var service = () =>{
  return async () => {
    return await new Promise((resolve,reject) => {
      setTimeout(resolve, 1500,'hello');
    })
  }
}
console.log(service())

/* ***********************************async和await对Promise的影响**************************************************** */
// 对promise使用await，当前线程会阻塞等待直到Promise完成，才继续往后执行
// 执行前-->hello(1.5s后)-->执行后
// 如果把下面的await去掉，就会变成  执行前-->执行后-->hello(1.5s后)
async function testWait(){
  console.log('执行前')
  await new Promise(resolve => {
    setTimeout(resolve, 1500,'hello');
  }).then(value => {
    console.log(value)
  });
  console.log('执行后')
}
 testWait();
