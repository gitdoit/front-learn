/**
 * 
 * 返回元组的长度
 *  直接访问元组的 ‘length’属性就行了
 * @link https://github.com/type-challenges/type-challenges/tree/main/questions/00018-easy-tuple-length
 */


type Length<T extends unknown[]> = T['length']

type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
