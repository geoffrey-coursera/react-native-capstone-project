export { HomeScreen as default };

import { useEffect, useState } from 'react';

import { View, StyleSheet } from 'react-native';
import MainView from '@/components/MainView';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import { H2 } from '@/components/StyledText';
import Categories from '@/components/Categories';

import * as MenuItems from '@/data/menuItems';
import { useFilter } from '@/hooks/useFilter';
import { effect, rejectIf, isEmpty } from '@/lib/functional';

import { Shades } from '@/lib/Colors';

const HomeScreen = () => {
    const [menuData, setMenuData] = useState<MenuItems.Item[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const { onSearch, onSelect } = useFilter((query, filters) => {
        MenuItems.filter(query, filters).then(setMenuData)
    });

    useEffect(() => {
        getData(MenuItems.query, MenuItems.fetch, MenuItems.save).then(data => {
            setMenuData(data);
            setCategories(extractCategories(data));
        });
    }, []);

    return (
        <MainView>
            <Hero onSearch={onSearch} />
            <View style={styles.order}>
                <H2>Order for delivery!</H2>
                <Categories
                    categories={categories}
                    onSelect={onSelect} />
            </View>
            <Menu data={menuData} />
        </MainView>
    )
};

const extractCategories = (data: MenuItems.Item[]): string[] =>
    Array.from(new Set(data.map(({ category }) => category)));

const getData = <R,>(
    queryData: () => Promise<MenuItems.Item[]>,
    fetchData: () => Promise<MenuItems.Item[]>,
    saveData: (data: MenuItems.Item[]) => Promise<R>
) => MenuItems.createTable()
    .then(queryData)
    .catch(() => [])
    .then(rejectIf(isEmpty))
    .catch(() => fetchData().then(effect(saveData)))
    .catch(effect(console.error));

const styles = StyleSheet.create({
    order: {
        paddingHorizontal: 12,
        paddingVertical: 24,
        gap: 12,
        borderBottomColor: Shades.green['10%'],
        borderBottomWidth: 1
    }
});