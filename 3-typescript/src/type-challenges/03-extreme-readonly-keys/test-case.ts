import type { Equal, Expect } from '@type-challenges/utils'

type GetReadonlyKeys<T, R extends T = Readonly<T>> = {
  [K in keyof T]-?: Equal<Pick<R, K>, Pick<T, K>> extends true ? K : never;
}[keyof T];


type cases = [
  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>,
]

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  readonly description: string
  completed?: boolean
}