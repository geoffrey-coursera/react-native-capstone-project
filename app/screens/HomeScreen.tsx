export { HomeScreen as default };

import { useCallback, useEffect, useState } from 'react';
import MainView from '@/components/MainView';
import debounce from 'lodash.debounce';
import Hero from '@/components/Hero';
import Menu, { MenuItem } from '@/components/Menu';
import { createTable, getMenuItems, saveMenuItems,  } from '@/lib/database';
import { effect, rejectIf, isEmpty } from '@/lib/functional';

const fetchMenuItems = () =>
    fetch('https://github.com/geoffrey-coursera/react-native-capstone-project/blob/main/public/capstone.json?raw=true')
    .then(r => r.json())
    .then(effect(() => console.log('fetching')))
    .then(({ menu }) => menu);

const HomeScreen = () => {
    const [menuData, setMenuData] = useState<MenuItem[]>([]);

    useEffect(() => {
        createTable()
            .then(() => getMenuItems())
            .catch(() => [])
            .then(rejectIf(isEmpty))
            .catch(() => fetchMenuItems().then(effect(saveMenuItems)))
            .then(effect(setMenuData))
            .catch(console.error);
    }, []);

    const updateQuery = useCallback(debounce((query: string) => {
        getMenuItems(query, []).then(setMenuData)
    }, 500), []);

    return (
        <MainView>
            <Hero onSearch={updateQuery} />
            <Menu data={menuData} />
        </MainView>
    )
};