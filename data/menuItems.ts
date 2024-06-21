export {
    createTable,
    dropTable,
    fetchMenuItems as fetch,
    saveMenuItems as save,
    queryMenuItems as query,
    filterMenuItems as filter,
};

export type { MenuItem, MenuItem as Item };

import { Filter, reduceFilters } from '@/lib/Filter';
import * as sql from '@/lib/sql';
import db from '@/data/database';
import { effect } from '@/lib/functional';

const fetchMenuItems = () =>
    fetch('https://github.com/geoffrey-coursera/react-native-capstone-project/blob/main/public/capstone.json?raw=true')
    .then(r => r.json())
    .then(effect(() => console.log('fetching')))
    .then(({ menu }) => menu);

const schema = {
    id: 'integer primary key autoincrement',
    name: 'text',
    price: 'real',
    description: 'text',
    image: 'text',
    category: 'text'
} as const;

type MenuItem = {
    [K in Exclude<keyof typeof schema, 'id'>]: typeof schema[K] extends
        infer V ? V extends 'text' ? string : number : never
}

const columns = Object.keys(schema) as Array<keyof typeof schema>;

const dropTable = () => db.runAsync(
    `drop table menuitems;`
);

const createTable = () => db.runAsync(
    `create table if not exists menuitems (${
        Object.entries(schema)
            .map(([title, type]) => `${title} ${type}`)
            .join(', ')
    });`
);

const queryMenuItems = (): Promise<MenuItem[]> =>
    db.getAllAsync(`select * from menuitems`);

const filterMenuItems = (
    query: string,
    activeCategories: string[]
): Promise<MenuItem[]> => {
    const conditions: Filter[] = [
        {
            predicate: () => query.length > 0,
            where: 'name like ?',
            params: [`%${query}%`]
        },
        {
            predicate: () => activeCategories.length > 0,
            where: `category in ${sql.PlaceholderTuple(activeCategories.length)}`,
            params: activeCategories
        }
    ];

    const { where, params } = reduceFilters(conditions);
    
    return db.getAllAsync(`select * from menuitems ${where}`, params)
};

const saveMenuItems = (menuItems: MenuItem[]) => {
    const keys = sql.Tuple(columns);

    const placeholder = sql.PlaceholderTuple(columns.length);

    const skeleton = Array(menuItems.length).fill(placeholder).join(', ');

    const values = menuItems.flatMap(item => columns.map(col =>
        col === 'id' ? null // autoincrement
        : item[col]
    ));

    return db.runAsync(`insert into menuitems ${keys} values ${skeleton}`, values);
}