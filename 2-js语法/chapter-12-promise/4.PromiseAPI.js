/* **************************************************************************************** */
/* *******************************Promise.resolve/reject**************************************** */
/* *******************************胶水API?************************************************ */
// 为了保持兼容性,或一致性,Promise对象提供了resolve和reject方法
// Promise.resolve(value) 用结果 value 创建一个 resolved 的 promise。
// Promise.reject(reason) 用结果 reason 创建一个 rejected 的 promise。

// Promise.resolve(1) 等价 new Promise((res, rej) => res(1))


/* **************************************************************************************** */
/* *******************************Promise.all********************************************* */
/* *******************************同生共死********************************************** */
let one = Promise.resolve(1);
let two = Promise.resolve(2);
let three = new Promise((res, rej) => {
  setTimeout(res, 1000, 3);
})
// 等待所有的Promise对象都变为resolved状态后,才会执行then
// then中的入参 是一个数组,每个元素都和all中的Promise对象一一对应
Promise.all([one, two, three]).then(([a,b,c]) => {
  console.log(a,b,c);
  console.log('all done');
})
let err = new Promise((res, rej) => {
  setTimeout(rej, 1000, new Error('emit an error'));
})


// 只要有一个Promise对象变为rejected状态,就会执行catch
// 但是需要注意的是,虽然一组Promise对象中有一个变为rejected状态
// 但是其他的Promise对象依然会继续执行,只是不会执行then
// 因为Promise中没有提供类似于break的机制
Promise.all([one, two, err]).then(([a,b,c]) => {
  console.log(a,b,c);
  console.log('all done');
}).catch(err => {
  console.log('catch:',err.message);
})


/* **************************************************************************************** */
/* *******************************Promise.allSettled**************************************** */
/* ********************************活要见人,死要见尸************************************************ */
// Pormise.all方法对于有些场景有些局限性,如果其中某个Promise失败了,会导致整个Promise.all失败
// 有些情况下我们知道Promise可能会出问题,但是我们仍然希望获取其他没有出问题的Promise的结果
// 这时候就可以使用Promise.allSettled
let p1 = Promise.resolve(1);
let p2 = Promise.reject(new Error('emit an error'));
let p3 = new Promise((res, rej) => {
  setTimeout(res, 1000, 3);
})
Promise.allSettled([p1, p2, p3]).then((results) => {
  // 返回值的顺序和Promise.all一样
  // 只是此处的结果可能有成功的有失败的
  // 所以返回一个有status字段的对象,表示执行是否成功
  results.forEach(({status,value,reason}) => {
    if(status === 'fulfilled') {
      console.log('good for',value)
    } else {
      console.log('some err,',reason)
    }
  })
})

/* **************************************************************************************** */
/* *******************************Promise.race**************************************** */
/* ******************************越快越好,不论结果************************************************ */
// Promise.race方法,只要其中任意一个Promise对象变为 fulfilled/rejected状态,就会执行then/catch



let p4 = new Promise((res, rej) => {
  setTimeout(res, 500, '500ms for p4');
  //rej('emit an error');
})
let p5 = new Promise((res, rej) => {
  setTimeout(res, 800, '800ms for p5');
})
Promise.race([p4, p5]).then((value) => {
  // 500ms for p4
  console.log(value);
}).catch(err => {
  console.log('catch:',err);
})

/* **************************************************************************************** */
/* *******************************Promise.any**************************************** */
/* ******************************第一个成功的人************************************************ */
// Promise.any方法,只要其中任意一个Promise对象变为 fulfilled状态,就会执行then
// 如果所有的Promise对象都变为rejected状态,就会执行catch
let p6 = new Promise((res, rej) => {
  // p6先完成,但是是rejected状态,不会到达then
  setTimeout(rej, 500, '500ms for p6');
})
let p7 = new Promise((res, rej) => {
  setTimeout(res, 800, '800ms for p7');
})
Promise.any([p6, p7]).then((value) => {
  // 800ms for p7
  console.log(value);
}).catch(err => {
  console.log('catch:',err);
})

/**
 * gitdoit
我在写Promise的编程笔记,我希望用生动的描述来表达这些API的含义,希望能够尽可能的接近. 比如Promise.allSettled 描述为 活要见人,死要见尸 ,意思是这个API可以获取所有Promise的结果,不论成功或失败. 现在请你 对 Promise.any 写一个相似的描述

GitHub Copilot
对于 Promise.any，一个生动的描述可能是 "一线生机"。这是因为 Promise.any 会在任何一个 Promise 完成（无论成功或失败）后立即返回，就像在绝望中找到了一线生机。

gitdoit
我觉得不太贴切, 因为Promise.any 只返回第一个状态变更为 fulfilled的结果, 请再提供一个

GitHub Copilot
对于 Promise.any，一个更贴切的描述可能是 "抓住救生圈"。这是因为 Promise.any 会在第一个 Promise 完成（成功）后立即返回，就像在海洋中的人抓住了第一个抛过来的救生圈。
 */

/**
 * 你
我在写js Promise的编程笔记,我希望用生动的描述来表达这些API的含义,希望能够尽可能的接近. 比如Promise.allSettled 描述为 活要见人,死要见尸 ,意思是这个API可以获取所有Promise的结果,不论成功或失败. 现在请你 对 Promise.any 写一个相似的描述

Copilot
当谈到 Promise.any 时，我会用一个类似的描述来帮助你理解它：

Promise.any 就像是一场激烈的竞赛，各个 Promise 都在拼命地奔跑。它们中的任何一个成功到达终点，都会让你欢呼雀跃。但是，如果所有的 Promise 都失败了，你会感到失望，因为你希望至少有一个能够成功。

所以，Promise.any 的含义就是：只要有一个 Promise 成功，就算胜利；如果所有的 Promise 都失败，那就是失败。这就像是在赛场上，只要有一个选手冲过终点线，就算获胜；如果所有选手都没有成功，那就是失败。

希望这个描述能够帮助你更好地理解 Promise.any！如果还有其他问题，欢迎继续提问。
 */