export { InputField as default };

import { View, StyleSheet, TextInput, KeyboardType, Keyboard, TextStyle, StyleProp, ScrollView, LayoutChangeEvent } from 'react-native';
import { Highlight } from '@/components/StyledText';
import { Colors, Shades } from '@/lib/Colors';

import { RefObject, useEffect, useRef, useState } from 'react';

type InputFieldProps = {
    label: string,
    value: string,
    keyboardType?: KeyboardType
    onChangeText: (a: string) => void,
    inputStyle?: StyleProp<TextStyle>,
    scrollTo?: RefObject<ScrollView>,
    scrollOffset?: number
};

const InputField = ({
    label,
    value,
    onChangeText,
    keyboardType='default',
    inputStyle,
    scrollTo,
    scrollOffset=0
}: InputFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const [posY, setPosY] = useState(0);
    const updatePosY = (e: LayoutChangeEvent) => setPosY(e.nativeEvent.layout.y);

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
        <View style={styles.inputField} onLayout={updatePosY}>
            <Highlight>{label}</Highlight>
            <TextInput
                ref={inputRef}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
                style={[styles.textInput, inputStyle, isFocused && styles.focus]}
                onBlur={() => setIsFocused(false)}
                onFocus={() => {
                    setIsFocused(true);
                    if (scrollTo) scrollTo?.current?.scrollTo({
                        y: posY + scrollOffset,
                        animated: true
                    });
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputField: {
        gap: 8
    },
    textInput: {
        borderWidth: 2,
        borderColor: Shades.green['10%'],
        borderRadius: 12,
        paddingVertical: (Platform.OS === 'ios' ? 6 : 0) + 2,
        paddingHorizontal: 12,
        backgroundColor: Colors.paper
    },
    focus: {
        borderColor: Colors.green
    }
});