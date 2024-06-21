export { SearchBar as default };

import { View, TextInput, StyleSheet } from 'react-native';
import Colors from '@/lib/Colors';
import { Ionicons } from '@expo/vector-icons';

type SearchBarProps = {
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string
};

const SearchBar = ({ value, onChangeText, placeholder }: SearchBarProps) => (
    <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={Colors.green} style={{position: 'relative', top: 1}} />
        <TextInput value={value} placeholder={placeholder} onChangeText={onChangeText}/>
    </View>
);

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: Colors.paper,
        borderRadius: 18,
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 6,
        gap: 6
    }
})