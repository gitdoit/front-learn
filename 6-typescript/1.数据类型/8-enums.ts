// 枚举和java差不多
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
console.log(Direction.DOWN);


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
console.log(STATE.NO === value);

// 常量枚举,加上一个const关键字的作用就是,看看编译后文件就知道了
// 这种方式是直接替换
const enum TYPE {
   TYPE_A = 'A',
   TYPE_B = 'B'
}
console.log('A' === TYPE.TYPE_A);
