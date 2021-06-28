// 类型推断
let str = '这是一个字符串,但是并没有给变量str定义类型,但是ts会推断他是一个字符串类型';
// str = 123; 由于被推断为字符串类型,所以不能再赋其他类型

function getLength(arg: number | string) :number {
  // 并不是强转, 而是告诉编译器 我要把它当成字符串,即使实际是number也不会报错
  // 只是如果是number的话 就没有length属性了
  let asStr = arg as string;
  if(asStr.length){
    return asStr.length;
  }else{
    let num = arg as number;
    return num.toString().length;
  }
}

function getLength2(arg : number | string) :number {
  if(typeof arg === 'number'){
    // 这个比java好,进入这个分支之后编译器自动识别是一个number类型,不再需要和java那样去强转
    // 就能够直接使用number的方法
    return arg.toString().length;
  }else {
    return arg.length;
  }
}