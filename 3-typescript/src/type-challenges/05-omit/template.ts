export type MyOmit<T,I extends keyof T> = {
    [K in Exclude<keyof T,I>] : T[K]
}