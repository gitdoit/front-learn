/**
 * 常规函数只能返回返回一次，而生成器函数可以返回多次
 */
function *foo() {
  yield 1;
  console.log('after 1')
  yield 2;
  console.log('after 2')
  yield 3;
}

let gen = foo();// 此时,函数体还未被执行,仅仅是返回了一个迭代器对象
console.log(gen.next().value);// 1
console.log(gen.next().value);// after 1
                              // 2
console.log(gen.next().value);// after 2
                              // 3


/**
 * generator 是可迭代的
 */
function *arrGen(){
  // SyntaxError: Unexpected number
  // Array.from({length: 10}).forEach((_,i) => {
  //   yield 1;
  // });
  for(let i = 0; i < 10; i++) {
    yield i;
  }
}
let arr = arrGen();

// 由于arr是一个迭代器对象,所以可以使用iterator的所有功能
// 1. 包括 for of
for(let a of arr) {
  console.log(a)
}
// 2. 也包括 spread语法
console.log([...arrGen()].join(','))
// 3. 也包括Array.from
console.log(Array.from(arrGen()).join(','))
// 但是!!!注意他不是数组,所以不能使用数组的方法
// console.log(arrGen().map((a) => a)) !!!TypeError: arrGen(...).map is not a function


/**
 * 使用generator改造 可迭代的对象
 */
let range = {
  from: 1,
  to: 5,
  // 之前的形式
  // [Symbol.iterator](){
  //   return {
  //     current: this.from,
  //     last: this.to,
  //     next(){
  //       if(this.current <= this.last){
  //         return {done: false, value: this.current++}
  //       }else{
  //         return {done: true}
  //       }
  //     }
  //   }
  // }

  // 使用generator改造
  *[Symbol.iterator](){
    for(let i = this.from; i <= this.to; i++) {
      yield i;
    }
  }
}
console.log([...range])