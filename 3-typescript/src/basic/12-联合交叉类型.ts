// 声明两个联合类型 A B
type A = 1 | 2
type B = 2 | 3 | 4

// 对于C，我们去A和B的交叉类型（Intersection Types）
// 此时的行为就像是两个集合做交集
type C = A & B  // => 2

// 对于D，我们取A和C的组合类型（Composing Types）
// 此时的行为就像是两个集合做并集， 结果显而易见
type D = A | B // => 1 | 2 | 3 | 4

// 特殊情况1 
type E = false
type F = true 
// 你以为时 true | false
// 但得到的时 boolean， 其实也对
type G = E | F




/**
 * 对于对象类型？
 */
type O1 = {
    a: string,
    b: string
}
type O2 = {
    a: string,
    c: string
}
// 按照直接， 你以为 & 操作作用在这里还是求交集一样，得到结果 {c:string} ❌
// 其实实际效果像是求两个类型的并集，得到一个{a:string,b:string,c:string}
type O3 = O1 & O2
let ins :O3 = {
    a: "",
    b: "",
    c: ""
}

// 既然上面的 & 最总结果是两个类型的 “合集”
// 那 | 操作应该就是“差集”了把 ❌
// | 在这里的意思是 O4 可以是 O1 也可以是O2
// 非常反直觉！！！
// 上面的 & 粒度 作用于到类型中属性，但是这里的 | 只作用到整个类型 🤷‍♂️


type O4 = O1 | O2
let ins1: O4 = {// 满足O1 👌
    a: "",
    b: ""
}
let ins2 :O4 = {// 满足O2 👌
    a: "",
    c: ""
}