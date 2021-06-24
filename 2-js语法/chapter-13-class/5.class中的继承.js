// 和java一样使用extends继承
class Point {
  // 实例上的属性
  x = 0;
  y = 0;

  constructor() {
    console.log(this);
  }
}

class ColorPoint extends Point{
  constructor() {
    console.log('子类构造函数执行!');
    // 1. 不用必须在第一行,但是必须在使用this之前调用
    // 2. super()调用父类构造方法,但构造方法的执行环境是子类实例; super() --> Point.prototype.constructor.call(this)
    //    所以不是我想的和java那样,实例属性挂在父类上,而是都挂在子类实例上.那么就更没有属性覆盖这一说了
    // 3. 当使用super函数时,必须在构造函数中使用
    super();
    this.color = 'red';
  }

  showInfo(){
    console.log(`The point at(${this.x},${this.y}),color is ${this.color}`);
  }

  useSuper() {

  }
}

let c = new ColorPoint();
//let b = new ColorPoint();
//c.x = 22;
//c.showInfo();
