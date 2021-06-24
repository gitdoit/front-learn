// 来自阮一峰 : https://es6.ruanyifeng.com/?search=Map&x=0&y=0#docs/class

class Point {
  // 1. 构造函数,可以省略,如果省略 会默认添加一个空的构造函数
  // 2. 默认返回创建的新对象,当然可以返回其他东西 let me see see
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get area(){
    return 'get'
  }

  set area(value){
    console.log(`setArea:${value}`);
  }

  //3. 挂在原型上的方法 === Point.prototype = {showMe() {}}
  showMe() {
    console.log(`The point at (${this.x},${this.y})`);
  }
}

let p1 = new Point(1,2);
let p2 = new Point(2,3);

// true 4. 原型上的方法,所以共享一个原型
console.log((p1.showMe === p2.showMe) && (p1.showMe === Point.prototype.showMe));
// true 5. 和构造函数一样
console.log(Point === Point.prototype.constructor);

// []  6.类内部定义的方法不可枚举, 区别:用ES5的Point.prototype.showMe = funcation(){} 就能枚举
console.log(Object.keys(Point.prototype));
// [ 'constructor', 'showMe' ] 7.
console.log(Object.getOwnPropertyNames(Point.prototype));

// 8. get set和之前一样
console.log(p1.area);
p1.area = '123'


// 9. 类表达式
const MyClass = class Me {
  saySomething(){
    console.log('h');
  }
}

// 10. 没有变量提升, 所以不能这么用
// let a = new Foo();
class Foo {

}