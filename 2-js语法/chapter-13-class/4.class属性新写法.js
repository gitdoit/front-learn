class Foo {
  // 实例属性定义在顶部,清晰明了,和Java一样
  name = 'Michael';
  age = 18;
  // 属性前加#代表私有属性,不知道这个提案目前在哪个阶段
  // 外部不能访问,只能内部访问
  #privateFeild = '1212';

  constructor(money = 0){
    if(money > 0) {
      this.name = 'Jean'
      this.age = 88;
    }
    console.log(this.name);
    console.log(this.age);
    console.log(this.#privateFeild);
  }


  callPrivateMethod (){
    this.#privateMethod();
  }

  // 私有方法还不支持啊??
  // #privateMethod () {
  //   console.log('This is ');
  // }
}

let foo = new Foo();
foo.callPrivateMethod();