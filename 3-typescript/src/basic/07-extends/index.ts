// 接口和类的继承 和Java基本一致

// 同时实现多个接口
interface Runnable {
  run() :void;
}

interface Stopable{
  stop() : void;
}
class Task implements Runnable,Stopable{
  run() :void {
    console.log('This is a implements method from Runnable!');
  }

  stop() :void {
    console.log('Stop the task!');
    
  }
}

//接口之间的继承
interface Shape {
  color: string;
}
// <Shape>{} 这是什么语法? 强转吗?
let o = <Shape>{};
o.color = '123';

let b :Shape = {color: '123'}