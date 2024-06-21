export { HomeScreen as default };

import { useCallback, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import MainView from '@/components/MainView';
import debounce from 'lodash.debounce';
import Hero from '@/components/Hero';

const HomeScreen = () => {
    const [query, setQuery] = useState('');

    
    const updateQuery = useCallback(debounce((q: string) => setQuery(q), 500), []);

    return (
        <MainView>
            <Hero onSearch={updateQuery} />
            <Text>{query}</Text>
        </MainView>
    )
};


const styles = StyleSheet.create({

})