import $ from 'jquery'
import './css/my.css'
$(function(){
    $('li:odd').css('backgroundColor','white')
    $('li:even').css('backgroundColor','black')
})

// 高级语法，需要使用babel处理
class People{
    static info = 'nihao~~'
}
console.log(People.info);
//------------------------------------------------
// 1、引入vue
import Vue from 'vue'
// 2、引入vue组件
import app from '../components/App.vue'
// 3、创建vue实例
const v = new Vue({
    // 指定控制区域
    el:"#app",
    // 使用渲染，因为这里导入的vue不是完整的，所以使用渲染函数
    render:h => h(app)
});
