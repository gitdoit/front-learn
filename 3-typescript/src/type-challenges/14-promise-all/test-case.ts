declare function PromiseAll<T extends unknown[]>(values: readonly [...T]) : Promise<{
    [key in keyof T]: T[key] extends Promise<infer P> ? P : T[key]
}>

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

/**
 * 键入函数PromiseAll，它接受PromiseLike对象数组，返回值应为Promise<T>，其中T是解析的结果数组。
 * 给定一个函数类型 PromiseAll, 它接收PromiseLike对象数组,返回值为Promise<T>,其中T是解析的结果数组
 */
// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll(<const>[promise1, promise2, promise3])

