export { HomeScreen as default };

import { useCallback, useEffect, useState } from 'react';
import { useUpdateEffect } from '@/hooks.ts/useUpdateEffect';
import MainView from '@/components/MainView';
import debounce from 'lodash.debounce';
import Hero from '@/components/Hero';
import Menu, { MenuItem } from '@/components/Menu';
import { H2 } from '@/components/StyledText';
import Categories from '@/components/Categories';
import { createTable, filterMenuItems, getMenuItems, saveMenuItems,  } from '@/lib/database';
import { effect, rejectIf, isEmpty } from '@/lib/functional';
import { View, StyleSheet } from 'react-native';
import { Shades } from '@/lib/Colors';

const fetchMenuItems = () =>
    fetch('https://github.com/geoffrey-coursera/react-native-capstone-project/blob/main/public/capstone.json?raw=true')
    .then(r => r.json())
    .then(effect(() => console.log('fetching')))
    .then(({ menu }) => menu);

const getCategories = (data: MenuItem[]): string[] =>
    Array.from(new Set(data.map(({ category }) => category)));

const HomeScreen = () => {
    const [menuData, setMenuData] = useState<MenuItem[]>([]);
    const [query, setQuery] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);
    const [filters, setFilters] = useState<string[]>([]);

    useEffect(() => {
        createTable()
            .then(getMenuItems)
            .catch(() => [])
            .then(rejectIf(isEmpty))
            .catch(() => fetchMenuItems().then(effect(saveMenuItems)))
            .then(data => {
                setMenuData(data);
                setCategories(getCategories(data));
            })
            .catch(console.error);
    }, []);

    useUpdateEffect(() => {
        filterMenuItems(query, filters).then(setMenuData)
    }, [query, filters]);

    const updateQuery = useCallback(debounce((query: string) => {
        setQuery(query)
    }, 500), []);

    const updateFilters = useCallback((filters: string[]) => {
        setFilters(filters);
    }, []);

    return (
        <MainView>
            <Hero onSearch={updateQuery} />
            <View style={styles.order}>
                <H2>Order for delivery!</H2>
                <Categories
                    categories={categories}
                    filters={filters}
                    onSelect={updateFilters} />
            </View>
            <Menu data={menuData} />
        </MainView>
    )
};

const styles = StyleSheet.create({
    order: {
        paddingHorizontal: 12,
        paddingVertical: 24,
        gap: 12,
        borderBottomColor: Shades.green['10%'],
        borderBottomWidth: 1
    }
});