/**
 * 目录
 *  1.使用构造函数创建对象
 *  2.使用对象字面量创建对象
 *  3.对象字面量中函数的作用域
 *  4.字面量对象中函数的作用域
 *  5.创建对象的几个步骤
 */

// 1.使用构造函数创建对象
var obj = new Object();
obj.name = 'Michael';
obj.age = 16;

// 2.字面量对象-使用时赋值
var person = {};
person.name = 'jean';
person.age = 12;

// 3.字面量对象-创建时赋值
var dog = {
  name: 'cookie',
  age: 1,
  // 函数声明
  getName(){
    console.log(this.name);
  },
  // 函数表达式
  getAge: function(){
    console.log(this.age);
  },
  getInfo: () => {
    // 箭头表达式里面的this是创建的上下文，所以报错
    console.log(this.name);
  },
};
dog.getAge();


/**
 * 通过new 关键字创建对象的4个步骤
 * 1、创建一个新对象
 * 2、将构造函数的作用域指向这个新对象，此时构造函数中的this就是这个新对象了
 * 3、执行构造函数中的代码(添加的属性就到这个新对象上了)
 * 4、返回这个新对象
 * */
function Obj(a,b){
  this.a = a;
  this.b = b;
}
let obj = new Obj(1,2);


// 使用对象字面量传递大量参数，像是java的对象封装数据一样
function displayInfo (args) {
  var output = '';
  if (typeof args.name == 'string') {
    output += args.name;
  }
  if (typeof args.age == 'number') {
    output += args.age;
  }
  alert(output);
}

displayInfo({ name: 'liu', age: 22 });

// .访问 和[] 访问

// 一般情况下推荐使用.访问
console.info(dog.name);
// 但是也可以使用[]来访问一个属性，[]访问可以使用变量访问属性，而且当属性中含有非法字符或者是关键字的时候也是可以访问到的
console.info(dog['name'])
// 例如
console.info(dog['var'])
// 又或者
console.info(dog['the dog name'])

/* ***************************字面量对象中函数的作用域**************************** */
// 使用箭头函数是无法访问当前字面量对象中的属性的，因为默认的this是
// 箭头函数定义时的作用域
let cat = {
  name: 'my cute cate',
  age: 1,
  getName: function () {
    console.log(this.name);
  },
  getAge () {
    console.log(this.age);
  },
  getInfo: () => {
    console.log(this.name + ':' + this.age);
  }

}
cat.getInfo()