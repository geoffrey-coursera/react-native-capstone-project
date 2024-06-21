export { loadStateFromObject, loadStateFromGetter };

type KeyOf<C> = (keyof C) & string;
type Entry<C, K extends KeyOf<C>> = [K, C[K]]
type Getter<C, K extends KeyOf<C>> = () => Promise<Entry<C, K>[]>;

type GetSetterName<T extends string> = T extends `${infer A}${infer R}`
    ? `set${Uppercase<A>}${R}` : never

/** get a setState name from piece of state name */
const getSetterName = <T extends string>(key: T) =>
    'set' + key[0].toUpperCase() + key.slice(1) as GetSetterName<T>;

/** set a piece of state from a [stateName, state] pair and a record of setters */
const setEntry = <C, K extends KeyOf<C>>([key, value]: Entry<C, K>, context: C) => {
    const setterName = getSetterName(key);
    const setter = context[setterName as any as keyof C] as (a: any) => void;
    setter(value);
}

/** apply state entries */
const loadStateFromEntries = <C, K extends KeyOf<C>>(context: C) => (entries: Entry<C, K>[]) =>
    entries.forEach(([k, v]) => setEntry([k, v], context));

const loadStateFromGetter = <C, K extends KeyOf<C>>(context: C, getter: Getter<C, K>) =>
    getter().then(loadStateFromEntries(context));

const loadStateFromObject = <S extends object, C extends S>(context: C, state: S) =>
    loadStateFromEntries(context)(Object.entries(state) as Entry<C, KeyOf<C>>[]);