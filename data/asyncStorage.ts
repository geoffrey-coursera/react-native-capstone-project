export { getEntries, save, hasChanged };

import { ToEntry } from '@/lib/types';
import AsyncStorage from '@react-native-async-storage/async-storage'

type KeyOf<C> = (keyof C) & string;
type Entry = [string, string];
type State = Record<string, string | number | boolean>;

const save = <S extends State>(data: S) => {
    const serialised = Object
        .entries(data)
        .map(([k, v]) => [k, String(v)] as Entry);

    AsyncStorage.multiSet(serialised);
};

const getEntries = <S extends State>(initState: S, fields: readonly (keyof S & string)[]) => () => (
    AsyncStorage.multiGet(fields).then((data) =>
        data.map(([k, v]) => [k, parse(initState, k as keyof S, v)]))
) as Promise<Array<ToEntry<S>>>;

const parse = <S extends State>(initState: S, key: keyof S, value: string | null) => {
    switch (value) {
        case 'true': return true;
        case 'false': return false;
        case null: return initState[key]
        default: return value;
    }
}

const hasChanged = <S extends State>(state: S) => <K extends KeyOf<S>>(entries: [K, S[K]][]) =>
    entries.map(([key, value]) => ({ key: key, state: state[key], store: value }))
    .filter(({ state, store }) => state !== store)
    .map(({key, state, store }) => [
        `${key}:`,
        `    current value: "${state}"`,
        `    saved value: ${store ? `"${store}"`: '(no value)'}`
    ].join('\n'))