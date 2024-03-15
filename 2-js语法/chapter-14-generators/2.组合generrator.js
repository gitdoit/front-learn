/**
 * 我们可以使用 yield * 方法将多个生成器进行组合
 */



function *genSeq(from,to) {
  for(let i = from; i <= to; i++) {
    yield i;
  }
}

/**
 * 可以将多个生成器组合
 */
function *genComposer() {
  // 此处的 yield *表示,将当前的生产任务委托给另一个生成器
  // 如果不带*号,则表示将一个生成器对象返回
  yield *genSeq(1,5);
  yield *genSeq(8,10);
}

let gen = genComposer();
// 1,2,3,4,5,   8,9,10
console.log([...gen])


/**
 * 递归迭代器
 */
function *idMaker() {
  let index = 0;
  while(true) {
    yield index++;
    if(index > 3) {
      // 递归,这块调用次数多了会不会导致 overflow?
      // [...ids] --> 会的  Maximum call stack size exceeded
      yield * idMaker()
    }
  }
}
let ids = idMaker();
