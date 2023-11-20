// 声明一个全局的变量
// 告诉编译器: 即使编译期间该变量不存在,但我保证 他会存在于运行时,所以请不要报错.
// 一般用于引用第三方库,这些库可能是通过其他方式引入到运行时的
declare const __var_in_runtime : {
  version: string;
  index: number
}


// 更推荐使用接口来实现
interface MyMagciInRuntime {
  name: string;
  age: number;
  address?: string
}

declare let __my_magic: MyMagciInRuntime 



/* ******手动编写声明文件,以获得语法提示**************** */
declare var JQuery :(selector :string) => any;
// let el = JQuery('#id');// 这只是声明,没有实现


/* ******使用第三方库的声明文件,以获得语法提示****** */
// npm install --save @types/jquery
//jQuery('#id');