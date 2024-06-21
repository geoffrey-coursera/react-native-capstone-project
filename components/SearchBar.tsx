export { SearchBar as default };

import { View, Text, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { forwardRef } from 'react';
import { Colors, Shades } from '@/lib/Colors';
import { Ionicons } from '@expo/vector-icons';

type SearchBarProps = {
    value: string,
    onChangeText?: (text: string) => void,
    placeholder: string,
    style?: ViewStyle,
    editable?: boolean,
    ref: any
};

const SearchBar = forwardRef<TextInput, SearchBarProps>(
    ({ value, onChangeText, placeholder, style, editable=true }, ref) => {
        return (
            <View style={[styles.searchBar, style]}>
                <Ionicons name="search" size={24} color={Colors.green} />
                {editable ? (
                    <TextInput
                        ref={ref}
                        value={value}
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        placeholderTextColor={Shades.text['66%']}
                        style={styles.textInput}
                    />
                ) : (
                    <Text
                        ref={ref}
                        style={[styles.text, !value && styles.placeholder]}
                    >{value || placeholder}</Text>
                )}
            </View>
        );
    }
);

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: Colors.paper,
        borderRadius: 18,
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 6,
        gap: 6,
        alignItems: 'center'
    }, textInput:  {
        color: Colors.text,
        flex: 1,
    }, text:  {
        color: Colors.text,
        flex: 1,
        paddingVertical: 5
    }, placeholder: {
        color: Shades.text['66%']
    }
})