// 导入导出是编译时期做的事情，所以import语句放在哪里都是最先执行；

console.log("===========统一导出=================");
// 统一暴露
import {foo,bar,list} from './inOnce.js';
foo();
bar();
console.log(list);




console.log("===========分散导出=================");
// 分散暴露，也可以这样引用，同时还用用as关键字进行重命名
import {foo as foo2,bar as bar2,incr,num} from './inMore.js'
foo2();
bar2();
// num = 10; 报错，导出的是个常量
console.log(incr());
console.log(incr());





console.log("===========默认导出=================");
// 使用默认导出的函数，只导出默认的东西
import anyName from './inDefault.js'
anyName();
// 同时导出默认的和不默认的
import otherName,{saySomething,byDefault} from './inDefault.js'
byDefault();
otherName();
saySomething();





console.log("===========导出到对象上=================");
// 将暴露的东西放在一个对象上
import * as all from './asObject.js';
all.hello();
//all.hello = xxx;这样也会报错，不能改


console.log("===========使用常量=================");
import * as user from './constants.js'
console.log('常量：'+user.admin);
// user.admin = 'sdfsdf'; 这就不能改了