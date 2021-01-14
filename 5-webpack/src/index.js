// import $ from 'jquery'
import './css/css-test.css';
import './css/less-test.less';
// 测试引入的第三方依赖
// $(function(){
//     $('li:odd').css('backgroundColor','white')
//     $('li:even').css('backgroundColor','black')
// })

// babel处理 高级语法
class People {
    static info = 'nihao~~'
}
console.log(People.info);
// polifill处理高级API
console.log([1, 2, 3].includes(3));
