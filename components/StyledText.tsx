export { Title, SubTitle, Highlight, H3, P };

import { ReactNode } from 'react';
import { Text, StyleSheet, TextProps, TextStyle } from 'react-native';
import Colors, { Color } from '@/lib/Colors';

type StyleTextProps = Omit<TextProps, 'style'> & {
    children: ReactNode,
    style?: TextStyle,
    color?: Color,
    numberOfLines?: number
};

const styledText = { fontFamily: 'Karla', color: Colors.text };

const styles = StyleSheet.create({
    title: {
        fontFamily: 'MarkaziText',
        lineHeight: 64,
        fontSize: 64,
        color: Colors.lemon
    },
    subtitle: {
        fontFamily: 'MarkaziText',
        fontSize: 40,
        lineHeight: 40,
        marginTop: -15,
        color: Colors.paper
    },
    highlight: {
        ...styledText,
        fontSize: 18,
        lineHeight: 20,
    },
    h3: {
        ...styledText,
        fontSize: 21,
        lineHeight: 26,
        fontWeight: 'bold'
    },
    p: {
        ...styledText,
        fontSize: 17,
        lineHeight: 19,
    }
});

const StyledText = (styleSheet: TextStyle) =>
    ({ children, color, style={}, ...rest }: StyleTextProps) => (
        <Text style={[styleSheet, style, color && {color}]} {...rest}>
            {children}
        </Text>
    );

const Title = StyledText(styles.title);

const SubTitle = StyledText(styles.subtitle);

const Highlight = StyledText(styles.highlight);

const H3 = StyledText(styles.h3);

const P = StyledText(styles.p);