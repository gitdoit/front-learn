//console.info("hello");
// 将模块化的js导入到当前模块中，可以直接引用了
import m1,{s1,s2 as niubi,say} from './m1'
// 这种方式没有使用变量接收，意义就是只想执行被导入的模块
import './m2'
//{ a: 10, b: 20, show: [Function: show] } 没有c，因为我们没有暴露它
console.info(m1);
// 按需导入的s1
console.info(s1);
// 取别名
console.info(niubi);
