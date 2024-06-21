export { InputField as default };

import { View, StyleSheet, TextInput, KeyboardType, Keyboard, TextStyle, StyleProp, ScrollView, LayoutChangeEvent, Platform, Animated } from 'react-native';
import { Highlight, P } from '@/components/StyledText';
import { Colors, Shades } from '@/lib/Colors';
import { Ionicons } from '@expo/vector-icons';

import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import RenderOffScreen from './RenderOffScreen';
import { useUpdateEffect } from '@/hooks/useUpdateEffect';

type InputFieldProps = {
    required?: boolean,
    label: string,
    value: string,
    placeholder?: string,
    isValid?: boolean,
    errorMessage?: () => ReactNode,
    inlineErrorMessage?: string,
    keyboardType?: KeyboardType
    onChangeText: (a: string) => void,
    inputStyle?: StyleProp<TextStyle>,
    scrollTo?: RefObject<ScrollView>,
    scrollOffset?: number
};

const InputField = ({
    required,
    label,
    value,
    placeholder,
    isValid=required ? value.length > 0 : undefined,
    errorMessage,
    inlineErrorMessage,
    onChangeText,
    keyboardType='default',
    inputStyle,
    scrollTo,
    scrollOffset=0
}: InputFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [wasTouched, setWasTouched] = useState(false);

    const inputRef = useRef<TextInput>(null);
    const [posY, setPosY] = useState(0);
    const updatePosY = (e: LayoutChangeEvent) => setPosY(e.nativeEvent.layout.y);

    const showCheckMark = isValid && value;
    const showError = (
        isValid !== undefined && !isValid
        && wasTouched && (required || value !== '')
    );
    const showRequiredError = required && wasTouched && value === '';

    const showInlineError = showError && inlineErrorMessage && value !== '';
    
    const showRequired = required && !showCheckMark && !showError;

    useEffect(() => {
        if (value) setWasTouched(true)
    }, [value, wasTouched])

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

    const {computeHeight, dynamicHeight} = useAnimateHeight(showError);

    return (
        <View style={styles.inputField} onLayout={updatePosY}>
            <View style={styles.label}>
                <Highlight>{label}{showRequired ? '*' : ''}</Highlight>
                {showCheckMark &&
                    <Ionicons name="checkmark-circle-sharp" style={[styles.checkMark]} />
                }
                {showError && <>
                    <Ionicons name="close-circle-sharp" style={[styles.cross]} />
                    {showRequiredError && <P color={Colors.error}>required</P>}
                    {showInlineError && <P color={Colors.error}>{inlineErrorMessage}</P>}
                </>}
            </View>
            <TextInput
                ref={inputRef}
                keyboardType={keyboardType}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={Shades.green['33%']}
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
            {errorMessage &&
            <>
                <Animated.View style={[styles.errorAnimatedWrapper, { height: dynamicHeight }]}>
                    <View style={styles.errorInnerWrapper}>
                    {errorMessage?.()}
                    </View>
                </Animated.View>
                <RenderOffScreen render={errorMessage} onLayout={computeHeight} />
            </>
            }
        </View>
    );
};

const verticalGap = 8;

const icon = {
    fontSize: 18,
} satisfies TextStyle;

const styles = StyleSheet.create({
    inputField: {
        gap: verticalGap,
    },
    errorAnimatedWrapper: {
        overflow: 'hidden',
        marginTop: -verticalGap,
    },
    errorInnerWrapper: {
        paddingTop: verticalGap
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
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
    },
    checkMark: {
        ...icon,
        color: Colors.green
    },
    cross: {
        ...icon,
        color: Colors.error
    }
});

const useAnimateHeight = (showError: boolean) => {
    const [errorHeight, setErrorHeight] = useState(0);
    const dynamicHeight = useRef(new Animated.Value(0)).current;

    const toggleError = (show: boolean) => Animated.timing(dynamicHeight, {
        toValue: show ? errorHeight + verticalGap : 0,
        duration: 200,
        useNativeDriver: false
    }).start();

    const computeHeight = (e: LayoutChangeEvent) => {
        setErrorHeight(Math.round(e.nativeEvent.layout.height));
    };

    useUpdateEffect(() => toggleError(showError), [showError]);

    return { computeHeight, dynamicHeight }
}