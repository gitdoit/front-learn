export {}

/**
 * 对我来说ts中的枚举非常具有迷惑性
 * 因为在java中枚举实际上是一个类型
 * 而枚举的值是一个对象,这个对象具有方法
 * 
 * 但是在ts中的枚举,更像是一个"联合类型"
 * 它和联合类型的区别是联合类型仅仅是类型不能当作value来用
 * 而枚举却可以当value来用
 * 
 */

enum Direction {
  // UP的值为0
  UP,
  // 下一个成员自增为1
  DOWN,
  // 2
  LEFT,
  // 3
  RIGHT
}
// 输出 : 0
console.log(Direction.DOWN);
// 输出: UP
console.log(Direction[0]);



// 手动指定也可以
enum HttpState {
  OK = 200,
  FOR_BIDDEN = 401,
}


// 可以使用字符串
enum STATE {
  YES = 'OK',
  NO = 'FAIL'
}
let value = 'FAIL';
// 输出true
console.log(STATE.NO === value);



// 常量枚举,加上一个const关键字的作用就是,看看编译后文件就知道了
// 这种方式是直接替换
const enum TYPE {
   TYPE_A = 'A',
   TYPE_B = 'B'
}
console.log('A' === TYPE.TYPE_A);

