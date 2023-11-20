export {}

// __var_in_runtime 被声明与 global.d.ts 中
console.log(__var_in_runtime?.index);

// 同样的
let el = JQuery('#id');