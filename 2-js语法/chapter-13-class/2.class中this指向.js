
// 1.class中的实例方法中的this指向当前实例
class Foo {

  constructor(){
    // 2.使用箭头函数绑定this,防止丢失引用.但是缺点是 这是绑定在实例上的函数,不被共享
    this.getThis = () => this;
  }

  // 3. 静态方法中的this指向当前类
  static sMethod(){
    console.log(`静态方法中的this: ${this}`);
  }

  showMe(){
    this.dance();
  }

  dance() {
    console.log('跳一支舞~');
  }
}

let bar = new Foo();
bar.showMe();

let noThis = bar.showMe;
// TypeError: Cannot read property 'dance' of undefined
// noThis();

let hasThis = bar.getThis();
console.log(hasThis);

Foo.sMethod();