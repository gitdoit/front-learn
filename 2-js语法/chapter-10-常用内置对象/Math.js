
/*****************关于Math的若干API*********************/
Math.E;
Math.PI;
// 一堆参数中最小的那个
console.info("Math.min(1,2,3,4,5):%d", Math.min(1, 2, 3, 4, 5));
// 还可以传数组，当然要这样,因为apply的第二个参数可以传参数数组
Math.min.apply(Math, [1, 2, 3, 4]);
Math.max(1, 2, 3, 4, 5);


/*****************舍入方法*********************/
console.info("Math.ceil(2.1) 向上舍入:%d", Math.ceil(2.1));
console.info("Math.floor(2.9) 向下舍入:%d", Math.floor(2.1));
console.info("Math.round(2.4) 四舍五入:%d", Math.round(2.4));
console.info("Math.round(2.5) 四舍五入:%d", Math.round(2.5));

/*****************随机数*********************/
console.info("Math.random()返回一个 0~1之间的浮点数:%f", Math.random());
console.info("Math.floor(Math.random() * 10) 返回一个0~9之间的数:%d", Math.floor(Math.random() * 10));

/*****************随机一个n~m之间的数*********************/
// 返回一个low~upper之间的数，包括low和upper
function selectFrom (low, upper) {
    let choices = upper - low + 1;
    return Math.floor(Math.random() * choices + low);
}
let arr = ['a', 'b', 'c', 'd'];
console.info("从数组中随机一个元素：%s", arr[selectFrom(0, arr.length - 1)]);
