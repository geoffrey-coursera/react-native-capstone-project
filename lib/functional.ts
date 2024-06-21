export { effect, rejectIf, isEmpty };

/** perform a side-effect while returning the input value unaltered */
const effect = <T, U>(f: (a: T) => U) => (a: T) => (f(a), a);

/** return a rejected `Promise` if the predicate evaluates to `true` */
const rejectIf = <T,>(p: (a: T) => boolean) => (a: T) => p(a) ? Promise.reject(a) : a;

/** check if an array-like datastructure is empty */
const isEmpty = <T extends { length: number }>(a:T) => !a.length;