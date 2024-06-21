export { getEntries, save };

import { ToEntry } from '@/lib/types';
import AsyncStorage from '@react-native-async-storage/async-storage'

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