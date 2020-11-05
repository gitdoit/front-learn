// 模板字符串
// 之前用字符串拼接一段html
const basket = { count: 1, onSale: 2 }
let h = 'There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
// 模板字符串的方法
// 在模板字符串中使用变量，需要用 ${}来包裹起来， 和spring一样
let h1 = `
          There are <b>${basket.count}</b> items
          in your basket, <em>${basket.onSale}</em>
          are on sale!
        `
console.log(h1);

// 可以在${}里面写表达式，如果在${}里面使用没有声明的变量也会报错
let fun = () => { return 3 }
let h2 = `${basket.onSale + 3 + fun()}`
console.log(h2);// 8

// 函数后接模板字符串
// [ 'hello~~' ]
console.log`hello~~`

/* *********************************新增的方法******************************* */
/**
 * includes()：返回布尔值，表示是否找到了参数字符串。
 * startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
 * endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
 */

 // 重复n次，xxx
 console.log('x'.repeat(3));
 // 字符串补全 012
 console.log('12'.padStart(3,'0'))
 // 123
 console.log('12'.padEnd(3,'3'));
 
 // 头尾去空格
 console.log(' abc'.trimStart());
 console.log('abc '.trimEnd());
 