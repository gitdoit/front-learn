// 别看错了，是export，这个相当于转发
// 由于没有引入，所以当前模块不能用foo\bar
export {foo,bar} from './inOnce.js';