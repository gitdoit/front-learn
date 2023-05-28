import type { Equal, Expect } from '@type-challenges/utils'

/**
 * @link https://github.com/type-challenges/type-challenges/tree/main/questions/00004-easy-pick
 * 
 * 从类型中筛选出指定属性，得到这个新的类型
 */
type MyPick<T,K extends keyof T> = {
  [P in  K] : T[P]
};


type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}