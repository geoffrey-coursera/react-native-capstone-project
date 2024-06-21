export { HomeScreen as default };

import { useEffect, useRef, useState } from 'react';

import { View, StyleSheet, Platform  } from 'react-native';
import MainView from '@/components/MainView';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import { H2 } from '@/components/StyledText';
import Categories from '@/components/Categories';

import * as MenuItems from '@/data/menuItems';
import { rejectIf, isEmpty } from '@/lib/functional';

import { Shades } from '@/lib/Colors';
import ErrorMessage from '@/components/ErrorMessage';

import { useSearchMode } from '@/context/SearchMode';
import { useUpdateEffect } from '@/hooks/useUpdateEffect';

const ErrorGettingData: ErrorMessage = {
    title: 'We could not bring you the menu.',
    body: Platform.OS === 'web' ? 'The web version is subject to CORS issues, use the native version.' : 'If this is your first time using the app, make sure you have an Internet connexion.'
};

const ErrorFilteringData: ErrorMessage = {
    title: 'We could not bring you the menu.',
    body: Platform.OS === 'web' ? 'The web version does not support query filtering' : 'There was an error querying the database'
};

const HomeScreen = () => {
    const { hasReachedTop, query, filters, searchMode, swipeHandlers, setSearchMode } = useSearchMode();
    const [dataError, setDataError] = useState<ErrorMessage | null>(null);
    const [menuData, setMenuData] = useState<MenuItems.Item[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useUpdateEffect(() => {
        MenuItems.filter(query, filters)
            .then(setMenuData, e => {
                console.error(e);
                setDataError(ErrorFilteringData)
            })
    }, [query, filters]);

    useEffect(() => {
        getData(MenuItems.query, MenuItems.fetch, MenuItems.save)
            .then(data => {
                setMenuData(data);
                setCategories(extractCategories(data));
            }, e => {
                console.error(e);
                setDataError(ErrorGettingData)
            });
    }, []);

    return (
        <MainView {...swipeHandlers}>
            <Hero />
            {dataError ? <ErrorMessage {...dataError} /> : <>
                <View style={styles.order}>
                    <H2>Order for delivery!</H2>
                    <Categories categories={categories} />
                </View>
                <Menu
                    data={menuData}
                    scrollEnabled={!!searchMode}
                    hasReachedTop={hasReachedTop}
                    onOverScroll={() => setSearchMode(false)}
                    />
            </>}
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
    .catch(() => fetchData().then(data => (
        saveData(data).catch(console.error),
        data
    )));

const styles = StyleSheet.create({
    order: {
        paddingHorizontal: 12,
        paddingVertical: 24,
        gap: 12,
        borderBottomColor: Shades.green['10%'],
        borderBottomWidth: 1
    }
});