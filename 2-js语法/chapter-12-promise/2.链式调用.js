// 基础链式调用
new Promise((res,rej) => {
  setTimeout(res, 1000, 1);
})

.then(value => {
  console.log('第一个,value:',value);
  // 直接返回一个值,会被包装成一个Promise对象,状态为resolved
  return value * 2;
})


.then(value => {
  console.log('第二个,value:',value);
  // 返回一个Promise对象,则会直接返回这个Promise对象
  return new Promise((res,rej) => {
    setTimeout(res, 1000, value * 2);
  })
})
// 由于上一步返回的是一个Promise对象,在他的状态变为resolved后,才会执行此处的then
.then(value => {
  console.log('finalValue:',value);
})
