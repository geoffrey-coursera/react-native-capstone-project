export { InputField as default };

import { View, StyleSheet, TextInput, KeyboardType, Keyboard, TextStyle, StyleProp } from 'react-native';
import { Highlight } from '@/components/StyledText';
import { Colors, Shades } from '@/lib/Colors';

import { useEffect, useRef, useState } from 'react';

type InputFieldProps = {
    label: string,
    value: string,
    keyboardType?: KeyboardType
    onChangeText: (a: string) => void,
    inputStyle?: StyleProp<TextStyle>
};

const InputField = ({
    label,
    value,
    onChangeText,
    keyboardType='default',
    inputStyle
}: InputFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            if (inputRef.current) {
                inputRef.current?.blur();
            }
        });
        
        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <View style={styles.inputField}>
            <Highlight>{label}</Highlight>
            <TextInput
                ref={inputRef}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
                style={[styles.textInput, inputStyle, isFocused && styles.focus]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputField: {
        gap: 8
    },
    textInput: {
        borderWidth: 2,
        borderColor: Shades.green['10%'],
        borderRadius: 12,
        paddingVertical: 2,
        paddingHorizontal: 12,
        backgroundColor: Colors.paper
    },
    focus: {
        borderColor: Colors.green
    }
});