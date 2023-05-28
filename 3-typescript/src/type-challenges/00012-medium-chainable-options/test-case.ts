/**
 * 根据链式构造方法构造得到一个接口类型
 * 其中已经使用过的key 不能被再次使用
 * 
 * 知识点1 通过<T = {}> 给定一个初始的空类型
 * 知识点2 option的返回值类型 合并传入的初始类型和该次调用产生的新类型
 *         这样在下一次调用的时候的反省就是前几次操作产生类型的并集了；
 *         其中泛型 <T & {[k in K]: V}> 中为什么不用K？ 而是用 [k in K]
 *         因为直接写成 <T & {K:V}> 得到的合并结果里key 全是 ”K“。没有把K当作参数名称
 * https://github.com/type-challenges/type-challenges/tree/main/questions/00012-medium-chainable-options
 */
type Chainable<T = {}> = {
    option<K extends string,V>(k: K extends keyof T ? never : K,v: V): Chainable<T & {[k in K]: V}>,
    get(): T
}
declare const config: Chainable<{}>
const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()

// 期望 result 的类型是：
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}