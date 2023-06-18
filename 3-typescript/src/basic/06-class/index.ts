// ts的类和java的基本类似
export const a = 1;
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }


  /**
   * 默认公共方法
   */
  public run() :string{
    return `${this.name} is running!`
  }

  /**
   * 和java一样
   */
  protected showName(){
    return this.name;
  }

  /**
   * 私有方法
   */
  private doAsPrivate(){
    console.log('This is private method from class Animal!');
    
  }

}

class Cat extends Animal{
  readonly age : number;
  constructor(name :string , age: number){
    super(name);
    this.age = age;
  }

  /**
   * 重写
   */
  run() :string{
    return 'Cat' + super.run();
  }
}

let xiaobai : Animal = new Cat('xiaobai',1);
xiaobai.run();