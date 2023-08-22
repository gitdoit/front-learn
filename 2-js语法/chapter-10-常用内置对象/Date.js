/**
 * 来点常用代码
 * 1、序列化，根据传入的指定日期格式，将日期对象格式化成字符串
 * 2、反序列化，根据传入的指定日期字符串形式，反序列化成日期对象
 * 3、日期加减，对指定日期实例加减天数、秒、月、年
 * 这些不是很常用的吗
 * 
 * 
 */



// 使用无参构造方法构造的日期类，和java一样是当前时间
var curDate = new Date();
console.info("使用无参构造函数构造的日期实例为:%o", curDate);


// 可以这样创建指定日期
curDate = new Date('2005-03-11T12:12:12');


let testDate = new Date('2023-11-11')
console.log(testDate.getTime())

// 使用Date.parse静态方法，将传入的字符串解析成为格林威治毫秒数
// 然后再通过Date的构造方法创建一个指定时间的日期
curDate = new Date(Date.parse('2005-03-11T12:12:12'));
console.info('使用new Date(Date.parse(\'2005-03-11T12:12:12\')) 创建的日期:%o', curDate);



//  年 月(0~11) 日(1~31) 时(0~23) 分 秒 毫秒
curDate = new Date(2019, 0, 12, 12, 12, 12, 33);
// 也可以这样
let mils = Date.UTC(2019, 0, 12, 12, 12, 12, 33);
var utc = new Date(mils);

// 静态方法，获取当前时间,返回值居然是个number
var now = new Date(Date.now());
// toLocalString:2019/12/25 下午5:36:33    toString:Wed Dec 25 2019 17:36:33 GMT+0800 (中国标准时间)   valueOf:1577266593729
console.info("toLocalString:%s    toString:%s   valueOf:%d", now.toLocaleString(), now.toString(), now.valueOf())


// 日期比较，因为Date的valueOf方法的返回值是一个number，所以可以直接通过 < >来比较日期
// 逻辑就是跟年龄一样，越往后越大，越往前越小
var date1 = new Date(2018, 5, 22);
var date2 = new Date(2015, 3, 12);
console.info('%s < %s 的返回值为 %s', date1.toLocaleString(), date2.toLocaleString(), date1 < date2)



// 日期格式化方法
var d = new Date();
console.info("d.toDateString():%s  toTimeString():%s  toLocaleDateString():%s", d.toDateString(), d.toTimeString(), d.toLocaleDateString())

// 其他方法
// 返回日期毫秒数
d.getTime();

// 通过日期毫秒数设置时间
d.setTime(d.getTime());

// 获取年份 2019
d.getFullYear();
d.getMonth();
d.getDay();
