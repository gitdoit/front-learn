// 1.静态方法不能被实例访问
class Foo{

  static show(){
    console.log('This is a static method from Foo!');
  }
}
Foo.show();
// 和java不一样的是,类的静态方法不能被实例访问
// TypeError: f.show is not a function
// let f = new Foo();
// f.show();


// 2.静态方法可以被子类继承
class Bar extends Foo{
  static say(){
    console.log('This is a static method from Bar!');
    // 静态方法里面的this指向当前类
    this.show();
  }
}

Bar.say();