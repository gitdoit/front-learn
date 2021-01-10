/**
 * 命名空间的方式，将变量和函数封装到了一个对象中
 * 减少了命名冲突的可能性，但是可以通过 obj.msg来修改变量
 */
let obj = {
  msg: 'namespace1',
  foo(){
    console.log('obj',this.msg);
  }
}