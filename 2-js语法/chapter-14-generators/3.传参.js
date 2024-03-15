function *paramableGen(){
  const value = yield 'what is your name?'
  console.log('hello! ',value)
  yield 'how is going?'
}
let t = paramableGen();
console.log(t.next().value)
// 此处的入参传送给上一个yield的返回值
// 同时返回下一个yield的value
// 起到呈上启下的作用
console.log(t.next('michael').value)