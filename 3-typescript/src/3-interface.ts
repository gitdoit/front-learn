interface IPerson{
  // 接口中声明的属性,实例必须定义
  age :number;
  name: string;
  // 如果使用 ?: 来定义类型就表示这个属性可给可不给
  optional?: string;
  // 定义一个属性只读
  readonly id: number;
}

let instance : IPerson = {
  age: 123,
  name: 'zh',
  id: 1
}

instance.age = 32;
// error
// instance.id = 13;