export {}
/**
 * 联合类型和枚举有什么区别?
 * https://stackoverflow.com/questions/40275832/typescript-has-unions-so-are-enums-redundant
 * 
 */


// 大部分情况下枚举类型能做的联合类型也能做
type ResponseState = 200 | 201 | 404 | 500 | 600
// 可以看到两种方式都能准确表示我们的响应码只有这几种类型
// 但是看起来枚举有更强的表达力,因为它不仅可以限定响应码
// 只有几种类型,同时还能表达这些响应码的含义
enum EResonseState  {
  SUCCESS = 200,
  SUCCESS_NOT_BODY = 201,
  NOT_FOUNT = 404,
  SERVER_ERROR = 500,
  NOT_KNOW = 600,
}
const responseState: ResponseState = 200;
const eResponseState: EResonseState = 200;



// 对于switch语句这俩一样
const unionSwitch = (state : ResponseState) => {
  switch(state) {
    case 200: return '200';
    case 201: return '201';
    case 404: return '404';
    case 500: return '500';
    default: return 'ok'!
  }
}
const enumSwitch = (state :EResonseState) => {
  switch(state) {
    case EResonseState.SUCCESS: return '200';
    case EResonseState.SUCCESS_NOT_BODY: return '201';
    case EResonseState.NOT_FOUNT: return '404';
    case EResonseState.SERVER_ERROR: return '500';
    default: return 'ok'!
  }
}



// 联合类型优势1: 联合类型可以迭代
const ButtonStatus = ['HIDDEN','ENABLED','DISABLED'] as const;
type ButtonStatus = typeof ButtonStatus[number]

for(const status of ButtonStatus) {
  console.log(status);
}


// 联合类型优势2: 联合类型可以拓展
type MyResponseStatus = ResponseState | 888
const myStatus :MyResponseStatus = 200

