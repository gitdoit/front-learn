// 参考 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

let target = {
  name: 'Michael'
}
// 使用assign
const modify = Object.assign(target,{age: 22})
console.log(modify)