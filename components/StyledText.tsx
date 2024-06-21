export { StyledText, Title, SubTitle, Highlight, H2, H3, H4, P, KarlaExtraBold, MarkaziText, fonts };

import { ReactNode } from 'react';
import { Text, StyleSheet, TextProps, TextStyle, StyleProp } from 'react-native';
import Colors, { Color } from '@/lib/Colors';
import { Ionicons } from '@expo/vector-icons';

const fonts = {
    MarkaziText: require('@/assets/fonts/MarkaziText.ttf'),
    KarlaRegular: require('@/assets/fonts/Karla-Regular.ttf'),
    KarlaMedium: require('@/assets/fonts/Karla-Medium.ttf'),
    KarlaBold: require('@/assets/fonts/Karla-Bold.ttf'),
    KarlaExtraBold: require('@/assets/fonts/Karla-ExtraBold.ttf'),
    ...Ionicons.font
};

type FontName = keyof typeof fonts;

const font = (font: FontName, lineHeightDiff = 3) =>
    (fontSize: number, lineHeightOverride?: number): TextStyle => ({
        fontSize,
        color: Colors.text,
        lineHeight: fontSize + (lineHeightOverride || lineHeightDiff),
        fontFamily: font,
    });

const KarlaMedium = font('KarlaMedium');
const KarlaBold = font('KarlaBold');
const KarlaExtraBold = font('KarlaExtraBold');
const MarkaziText = font('MarkaziText')

const styles = StyleSheet.create({
    title: {
        ...MarkaziText(64, 0),
        color: Colors.lemon
    },
    subtitle: {
        marginTop: -15,
        ...MarkaziText(40, 0),
        color: Colors.paper
    },
    highlight: KarlaMedium(16),
    h2: {
        ...KarlaExtraBold(21),
        textTransform: 'uppercase',
    },
    h3: KarlaExtraBold(20),
    h4: KarlaBold(20),
    p: KarlaMedium(16)
});

type StyleTextProps = Omit<TextProps, 'style'> & {
    children: string | string[],
    size?: number,
    style?: StyleProp<TextStyle>,
    color?: Color,
    noDescenders?: number | boolean
};

/** Create a text component from a style.\
 * setting `noDescenders` makes the font adjust vertically if the text indeed has no descenders.
 * It can be a boolean or an adjustment setting which is a fraction of the font size
 */
const StyledText = (styleSheet: TextStyle) =>
    ({ children, color, size, noDescenders, style, ...rest }: StyleTextProps) => {
        const text = Array.isArray(children) ? children.join('') : children;
        const adjustment = noDescenders === true ? 0.15 : noDescenders || 0;
        const shouldAdjust = (noDescenders === true || adjustment !== 0) && !text.match(/q|y|p|g|j/);
        const descenders = shouldAdjust && {
            marginBottom: - adjustment * (styleSheet.fontSize ?? 0)
        };
        const computedStyle = [
            styleSheet,
            style,
            color && {color},
            overrideSize(styleSheet, size),
            descenders
        ];

        return <Text style={computedStyle} {...rest}>{children}</Text>;
    }

const overrideSize = (styleSheet: TextStyle, size?: number) =>
    size === undefined ? size
    : { fontSize: size, lineHeight: ((styleSheet.lineHeight ?? NaN) * size / (styleSheet.fontSize ?? NaN)) || size + 3 };

const Title = StyledText(styles.title);

const SubTitle = StyledText(styles.subtitle);

const Highlight = StyledText(styles.highlight);

const H2 = StyledText(styles.h2);

const H3 = StyledText(styles.h3);

const H4 = StyledText(styles.h4);

const P = StyledText(styles.p);