export const a = 1;
/**
 * Set 结构和java中的Set一样， 确保集合中不会出现相同的元素；
 * 但是对于对象，java中可以通过覆盖equil hashCode 方法来比较两个对象在逻辑上是否
 * 是同一个对象， 但是在js中的set结构里，只能通过对象的引用地址判断；也就是说
 * 即使两个对象的数据完全一致，但是引用地址不一样，他们就不是同一个元素；
 * 
 */

//=======================创建=================================
// 创建,set的构造函数接受iterable类型的数据作为参数
// 也就是说你可以通过集合直接创建，如果集合中有重复元素，会被直接去重
const set1 = new Set([1,1,2])

// 才知道 string类型居然也是可以直接迭代的
// 所以也可以直接用在这里，对char去重
const setChar = new Set('aabcdd')


// 不会发生类型转换，所以这里的1和‘1’不是一个东西
const manyTypeSet = new Set([1,'1',2,'2'])
console.log(manyTypeSet);

// 两个空的字面量对象 不一样哦
const manyObjSet = new Set()
manyObjSet.add({});
manyObjSet.add({});
console.log(manyObjSet.size);


//======================属性==============================
const propSet = new Set();
console.log(propSet.size);


//======================方法==============================
const set = new Set();
// 添加
set.add(1).add(2);
console.log('size:',set.size);
// 判断是否存在
console.log('has 1',set.has(1));
// 移除元素
set.delete(1);



//======================遍历==============================
/**
 * Set.prototype.keys()：返回键名的遍历器
Set.prototype.values()：返回键值的遍历器
Set.prototype.entries()：返回键值对的遍历器
Set.prototype.forEach()：使用回调函数遍历每个成员
 */

let it = new Set([1,2,2,3,4,5]);
// 1 forEach
it.forEach(e => {
  console.log(e)
})

//2 use keys()
for(let theKey of it.keys()) {
  console.log(theKey)
}
// 3 use the values()
// 由于Set结构没有键名，所以keys和values行为完全一致
for(let theValue of it.values()) {
  console.log(theValue)
}

// 3 use the entries()
// 键值对
 for(const entr of it.entries()) {
  // [1,1]
  // [2,2]
  console.log(entr)
}

//========================并集/交集/差集=====================
let a1 = new Set([1,2,5]);
let a2 = new Set([2,3,4]);
// 并集
let union = new Set([...a1,...a2]);
console.log(union)
// 交集
let intersect = new Set([...a1].filter(x => a2.has(x)))
// 差集
let diff = new Set([...a1].filter(x => !a2.has(x)))




