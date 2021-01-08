/**
 * 大多数情况下函数中的this就代表着调用这个函数的人
 */

 /* ***************1、全局上下文中的this，我这是node环境*************************************** */
console.log(this === globalThis);


/* ***************2、作为对象中的方法中的this;只受调用对象的影响********************************** */

// 如果没有改变函数的执行环境，那么就是当前对象
let obj = {
  name:'hello',
  // 标准定义方式
  say: function(){
    console.log(this.name)
  },
  // ES5的简化方式
  walk(){
    console.log(this.name+'我走了很多路');
  },
}
// 正常期望,this就是当前调用对象
obj.say();
obj.walk();
// undefined，改变了函数的执行环境，this为全局对象
let letMySay = obj.say;
letMySay();

// 使用构造函数也一样
function Person(){
  this.name = 'Michael';
  this.say = function(){
    console.log(this.name);
  }
}
// 正常期望,this就是当前调用对象
let michael = new Person();
michael.say();
// undefined，改变了函数的执行环境，this为全局对象
let jeanSay = michael.say;
jeanSay();




/* ******************3、箭头函数中的this************************************** */

// 箭头函数中的this不可变，为定义时所在的对象
let arrow = {
  age: 33,
  // 只有在调用foo函数的时候才会定义箭头函数
  // 此时箭头函数所处的环境就是调用foo函数的对象，这点很好理解
  foo: function(){
    return () => console.log(this.age);
  },
  // 定义这个函数时的环境不是arrow对象
  // 具体是谁没查到，需要了解字面量对象的初始化过程
  // 如果放在构造函数中这样搞，this就是当前创建的新对象
  bar: () => {console.log(this.age);}
}
// 正常输出 33，arrow调用foo时定义箭头函数
arrow.foo()();
// 将箭头函数赋给一个变量，并在全局环境中去引用
// 如果是正常的函数，肯定输出undefined，但是箭头函数不会
let ref = arrow.foo();
ref();
// undefined
arrow.bar();


// 和上面的字面量对象中的箭头函数比较一下
// 这里的箭头函数就会指向bar，因为new对象的过程，执行到
// 给箭头函数初始化的时候this已经指向这个新对象了
function Bar(){
  this.name = '123';
  this.arrow = () => {console.log(this.name);}
}
(new Bar()).arrow();



/* ******************4、原型链中的this************************************** */
let o = {
  f() {
    return this.a + this.b;
  }
};
let p = Object.create(o);
p.a = 1;
p.b = 2;
// 很明显输出3，虽然f函数定义在原型上
// 但是调用是在p上啊
console.log(p.f());


/* ******************4、getter\setter中的this************************************** */
// this就是当前对象
function sum(){
  return this.a + this.b + this.c;
}
let getObj = {
  a:1,
  b:2,
  c:3,
  get avg(){
    return (this.a + this.b + this.c) / 3;
  }
}
Object.defineProperty(getObj,'sum',{
  get: sum,enumerable:true,configurable:true
})
console.log(getObj.avg);
console.log(getObj.sum);

/* ******************4、作为DOM事件处理函数************************************** */
// 在事件处理函数中的this就等于触发这个事件的dom对象
document.getElementById('dd').addEventListener('click',function(){
  // 这里面的this 就等于 id是dd的那个dom元素
  this.style.backgroundColor = '#A5D9F3';
})