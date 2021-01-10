/**
 * 和modules重名了
 * Uncaught SyntaxError: Identifier 'msg' has already been declared
 */
var msg = 'modules1...'
function bar(){
  console.log(this.msg);
}