export type ToEntry<T> = {
    [K in keyof T]: [K, T[K]]
} extends infer U ? U[keyof U] : never;