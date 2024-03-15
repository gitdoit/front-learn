/**
 * 1. Iterable 对象是数组的泛化. 意思就是说, 任何具有 Symbol.iterator 属性的对象都可以被迭代.
 *    数组是可以迭代的, 但不仅仅是数组,对于内置的 字符串对象也是可以迭代的.
 * 2. Array-like 类数组,是具有索引和length属性的对象
 * 
 * 
 * 总结: 
 *  1.让对象实现 Symbol.iterator 就可以让他变成[可迭代对象]
 *  2.可迭代对象可以使用for of 迭代
 *  3.使用Array.from可以将[可迭代对象]转换为数组
 *  4.让对象具有length属性,就可以使用Array.from将其转换为数组
 *  5.字符串是可迭代的,所以可以使用for of 迭代字符串
 */

// 可迭代的对象
let range = {
  from: 1,
  to: 5,
  // 只要让对象具有 Symbol.iterator 属性,这个属性返回一个迭代器对象({next:() {}}),就可以使用 for of 循环
  [Symbol.iterator]: function () {
    // 返回一个迭代器对象
    // 其中包含next 方法,该方法返回一个对象,该对象有两个属性
    // done: boolean 表示是否迭代完成
    // value: any 表示当前迭代的值
    return {
      current: this.from,
      last: this.to,
      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ }
        } else {
          return { done: true }
        }
      }
    }
  }
}

// 1 使用for of 迭代 可迭代对象
for (let num of range) {
  console.log(num);
}

// 2 使用Array.from 将可迭代对象转换为数组
let arr = Array.from(range);
// [ 1, 2, 3, 4, 5 ]
console.log(arr);


// 3 字符串是可迭代的,说明字符串是一个可迭代对象
for(let char of '1234') {
  console.log(char);
}
// 4 由于字符串是一个可迭代对象,所以可以使用Array.from将字符串转换为数组
let strArr = Array.from('1234');
console.log(strArr);

// 4 使用Array.from可迭代具有length属性的对象
Array.from({length: 5}).map((_,index) => {
  console.log(index)
})