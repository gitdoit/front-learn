export {}

enum PermissionCode {
  DELETE = 'd',
  READ = 'r',
  WRITE = 'w',
  OTHER = 'o'
}

// 手动声明一个类型,他的取值范围取自枚举的值
type Codes = 'd' | 'r' | 'w' | 'o'

// 从ts4.1 之后,可以这样做,避免手动关联
// 👇 ECodes = "d" | "r" | "w" | "o"
type ECodes = `${PermissionCode}`





// 参数用Codes类型声明
const declarWithType = (code: Codes) => {
  console.log(code);
}
// 使用的时候用枚举传值完全没有问题
declarWithType(PermissionCode.DELETE)
// 直接用字符串也行
declarWithType('d')




const declarWithEnum = (code : PermissionCode) => {
  console.log(code);
}
declarWithEnum(PermissionCode.DELETE)
// 👇 这里用字符串就不行
// declarWithEnum('d') Argument of type '"d"' is not assignable to parameter of type 'PermissionCode'