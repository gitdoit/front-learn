function foo(){
  console.log('This foo function  is tong yi baolu!');
}
function bar(){
  console.log('This bar function si tong yi baolu!');
}
let obj = {};
let arr = [1,2,3,4];
let b = arr.includes(3);
let attr = obj?.c?.b;
export {foo,bar,arr as list}