export { StyledText, Title, SubTitle, Highlight, H2, H3, P, KarlaExtraBold, fonts };

import { ReactNode } from 'react';
import { Text, StyleSheet, TextProps, TextStyle } from 'react-native';
import Colors, { Color } from '@/lib/Colors';

const fonts = {
    MarkaziText: require('@/assets/fonts/MarkaziText.ttf'),
    KarlaRegular: require('@/assets/fonts/Karla-Regular.ttf'),
    KarlaMedium: require('@/assets/fonts/Karla-Medium.ttf'),
    KarlaBold: require('@/assets/fonts/Karla-Bold.ttf'),
    KarlaExtraBold: require('@/assets/fonts/Karla-ExtraBold.ttf'),
};

type FontName = keyof typeof fonts;

const font = (font: FontName, lineHeightDiff: number) =>
    (fontSize: number): TextStyle => ({
        fontSize,
        color: Colors.text,
        lineHeight: fontSize + lineHeightDiff,
        fontFamily: font,
    });

const KarlaMedium = font('KarlaMedium', 3);
const KarlaExtraBold = font('KarlaExtraBold', 3);
const MarkaziText = font('MarkaziText', 0)

const styles = StyleSheet.create({
    title: {
        ...MarkaziText(64),
        color: Colors.lemon
    },
    subtitle: {
        ...MarkaziText(40),
        marginTop: -15,
        color: Colors.paper
    },
    highlight: KarlaMedium(16),
    h2: {
        ...KarlaExtraBold(21),
        textTransform: 'uppercase',
    },
    h3: KarlaExtraBold(20),
    p: KarlaMedium(16)
});

type StyleTextProps = Omit<TextProps, 'style'> & {
    children: ReactNode,
    style?: TextStyle,
    color?: Color,
};

const StyledText = (styleSheet: TextStyle) =>
    ({ children, color, style={}, ...rest }: StyleTextProps) => (
        <Text style={[styleSheet, style, color && {color}]} {...rest}>
            {children}
        </Text>
    );

const Title = StyledText(styles.title);

const SubTitle = StyledText(styles.subtitle);

const Highlight = StyledText(styles.highlight);

const H2 = StyledText(styles.h2);

const H3 = StyledText(styles.h3);

const P = StyledText(styles.p);