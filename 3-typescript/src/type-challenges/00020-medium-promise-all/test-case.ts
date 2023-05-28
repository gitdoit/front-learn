


/**
 * 键入函数PromiseAll，它接受PromiseLike对象数组，返回值应为Promise<T>，其中T是解析的结果数组。
 * 
 * 理解 [key in keyof T]
 *  如果T是数组，这里表示数组中的每个索引位置
 *  如果T是对象，这里表对象中的每个属性
 * 
 *  则： {[key in keyof T]: T:[key]} 返回的是数组或对象类型本身
 * 
 * @link https://github.com/type-challenges/type-challenges/tree/main/questions/00020-medium-promise-all
 */

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// 入参是一个 常量数组，不是类型，所以不能用类型转换来实现了
const reasult = PromiseAll(<const>[promise1, promise2, promise3]) // ==> Promise<[number, 42, string]>



// 我的答案=======================================================================
// 对Promise的泛型设X，让ts去求解
type PromiseType<T> = T extends Promise<infer P> ? P : T
// 声明函数类型。
declare function PromiseAll<T extends readonly unknown[]>(values: T) : Promise<{
    // 由于T是元组类型，这里key in keyof T，遍历元组
    // 后面声明的value-->  PromiseType<T[key]> 替换原有坑位的值
    [key in keyof T] : PromiseType<T[key]> 
}>

