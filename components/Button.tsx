export { PrimaryButton, SecondaryButton }

import { View, StyleSheet, Pressable, ViewStyle, StyleProp } from 'react-native';
import {  Highlight } from '@/components/StyledText';
import { Colors, Shades } from '@/lib/Colors';

type ButtonProps = {
    disabled?: boolean,
    onPress: () => void,
    children: string,
    style?: StyleProp<ViewStyle>
};

const PrimaryButton = ({ disabled, onPress, children, style }: ButtonProps) => (
    <Pressable onPress={onPress} style={style}>
        <View style={[primary.surface, disabled && primary.disabled]}>
            <Highlight color={Colors[disabled ? 'text' : 'paper']}>{children}</Highlight>
        </View>
    </Pressable>
);

const SecondaryButton = ({ disabled, onPress, children, style }: ButtonProps) => (
    <Pressable onPress={onPress} style={style}>
        <View style={[secondary.surface, disabled && secondary.disabled]}>
            <Highlight color={Colors.green}>{children}</Highlight>
        </View>
    </Pressable>
);

const button = {
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2
} satisfies ViewStyle

const primary = StyleSheet.create({
    surface: {
        ...button,
        backgroundColor: Colors.green,
        borderColor: Colors.green

    },
    disabled: {
        backgroundColor: Shades.green['10%']
    },
});

const secondary = StyleSheet.create({
    surface: {
        ...button,
        borderColor: Colors.green
    },
    disabled: {
        opacity: 0.5
    }
});