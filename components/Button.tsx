export { PrimaryButton, SecondaryButton }

import { View, StyleSheet, Pressable, ViewStyle, StyleProp, Alert } from 'react-native';
import {  Highlight } from '@/components/StyledText';
import { Colors, Shades, Color } from '@/lib/Colors';

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
        backgroundColor: Shades.green['10%'],
        borderColor: Shades.green['33%']
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

type ButtonProps = {
    children: string,
    onPress: () => void,
    disabled?: boolean,
    disabledReasons?: string[],
    style?: StyleProp<ViewStyle>
};

type Styles = {
    surface: ViewStyle,
    surfaceDisabled: ViewStyle,
    color: Color
    disabledColor?: Color
};

const Button = ({ surface, surfaceDisabled, disabledColor, color }: Styles) => (
    ({ children, onPress, disabled, disabledReasons, style }: ButtonProps) => (
        <Pressable
            style={style}
            onPress={() => {
                if (disabled && disabledReasons)
                    Alert.alert(...formatMessage(disabledReasons));
                else if (!disabled) onPress();
            }}
        >
            <View style={[surface, disabled && surfaceDisabled]}>
                <Highlight color={disabled ? disabledColor : color}>
                    {children}
                </Highlight>
            </View>
        </Pressable>
    )
);

const PrimaryButton = Button({
    surface: primary.surface,
    surfaceDisabled: primary.disabled,
    color: Colors.paper,
    disabledColor: Colors.text
});

const SecondaryButton = Button({
    surface: secondary.surface,
    surfaceDisabled: secondary.disabled,
    color: Colors.green,
});

const formatMessage = (reasons: string[]) => {
    const errorTitle = `Please address ${
        reasons.length > 1 ? 'these concerns' : 'this concern'
    }:`;

    const errorMessage = reasons.length < 2 ? reasons[0]
        : reasons.map(e => '• ' + e).join('\n');
    
    return [errorTitle, errorMessage] as const;
}