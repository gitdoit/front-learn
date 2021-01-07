/**
 * 函数也是对象，万物皆对象；既然是对象，那么就会有方法！
 * 
 * aply和call
 *       这两个方法和java中的反射类似Method.invoke(obj,arg...);
 *       都是在指定实例上调用该函数，但apply/call方法的使用不必目标对象拥有该方法;
 *       这两个方法很类似，但区别在于call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。
 * 
 * bind
 *       就是给一个函数绑定一个执行环境，然后返回这个新的函数，对原函数没有影响。
 *       这样再调用这个新函数的时候，它的执行环境就在绑定的对象中了。
 */

/********************************call() apply() **************************************************/
// java里面的Method.invoke(targetObj,args...) 跟这个差不多的意思，都是在目标对象上调用该函数
// 但区别在于，java中要这样搞targetObj里面必须要有这个方法，而js里就不需要了
// 目的就是变更method的运行环境
var env = 'window';
var targetObj = {
    env: 'targetObj'
};
function invoke () {
    console.info("使用apply/call调用invoke方法，当前运行环境是:%s", this.env);
}
// apply和call差不多，区别就在于参数的传递
// apply传递数组或者arguments
invoke.apply(this);
invoke.apply(global);
invoke.apply(targetObj);
// call必须单个单个的传递/或者是一个arguments对象
invoke.call(targetObj);


// apply-数组追加。在把B数组的元素，push到A数组中；这样就不用循环了
let a = [1,2,3];
let b = [4,5,6];
a.push.apply(a,b);
console.log(a);

// apply-配合内置函数，求最大值
let arr = [1,2,3,4,5];
let max = Math.max.apply(null,arr);
console.log(max);



/********************************bind() 绑定函数的执行环境**************************************************/
// 上面的类反射方法，都是在某个环境中执行一次这个函数
// 而bind方法则是，生成一个新的函数，其中算法和原函数一样，但环境却被改变。


// bind-创建绑定函数,改变this指向
function bindInvoke () {
    console.info("当前运行环境是:%s", this.env);
}
var bindEnv = {
    env: 'bind'
};
var bindFun = bindInvoke.bind(bindEnv);
bindFun();// 当前运行环境是:bind



// bind-偏函数，让函数拥有预置的参数
function list(){
    return Array.prototype.slice.call(arguments)
}
let moreEle = list.bind(null,666)
console.log(moreEle(1,2,3));// 666,1,2,3


// bind-配合setTimeout,不丢失this指向
function Start(){
    this.music = '我只能永远读着对白，对着我对你的伤害...';
}
Start.prototype.sing = function(){
    console.log(this.music);
}
Start.prototype.singLater = function(){
    setTimeout(this.sing.bind(this),1000);
}
let jay = new Start();
jay.singLater()