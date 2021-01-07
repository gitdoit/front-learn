/**
 * 大多数情况下函数中的this就代表着调用这个函数的人
 */

// 1、全局上下文中的this，我这是node环境
console.log(this === globalThis);
