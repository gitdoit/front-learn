import type { Equal, Expect } from '@type-challenges/utils'


/**
 * 见名知意,深度递归的readonly
 * 问题是如何递归?
 * 
 * 知识点1, keyof T[K] 获取属性类型
 * 知识点2,通过extends never可以判断是否为基本类型
 * 知识点3,extends可以用递归
 * @link https://github.com/type-challenges/type-challenges/tree/main/questions/00009-medium-deep-readonly
 */
 type DeepReadonly<T> = {
    readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>
}


type cases = [
  Expect<Equal<DeepReadonly<X>, Expected>>,
]

type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type Expected = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}
