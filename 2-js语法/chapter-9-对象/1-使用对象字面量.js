/**
 * 对象字面量用来快速创建一个对象
 * 对象字面量
 * new
 * 属性访问器
 * 
 */

// 1、字面量对象-创建时赋值
var dog = {
  name: 'cookie',
  age: 1,
  // 函数表达式
  getAge: function(){
    console.log(this.age);
  },
  // ES6简写的方式
  getName(){
    console.log(this.name);
  },
  getInfo: () => {
    // 箭头表达式里面的this是创建的上下文，所以报错
    console.log(this.name);
  },
};
dog.getAge();
dog.getName();


// 2.字面量对象-使用时赋值
var person = {};
person.name = 'jean';
person.age = 12;
person.say = () => {
  console.log('hallo~')
}
person.run = function () {
  console.log(`run ${this.name}`)
}
person.run();


// 3. ES6中简便的定义方式
let a = 1,b = 2,c = [1,2,3];
let obj = {a,b,c}

// 4、重复的属性名，后面的覆盖前面的
let same = {x:1,x:2};
console.log(same.x);// 2

// 5、计算属性名
let x = 0;
let cal = {
  ['foo'+ ++x] : x,
  ['foo'+ ++x] : x,
}
console.log(cal.foo1);// 1



// .访问 和[] 访问
// 一般情况下推荐使用.访问
console.info(dog.name);
// 但是也可以使用[]来访问一个属性，[]访问可以使用变量访问属性，而且当属性中含有非法字符或者是关键字的时候也是可以访问到的
console.info(dog['name'])
// 例如
console.info(dog['var'])
// 又或者
console.info(dog['the dog name'])
