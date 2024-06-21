export { Title, SubTitle, Highlight };

import { ReactNode } from 'react';
import { Text, StyleSheet, TextProps, TextStyle } from 'react-native';
import Colors, { Color } from '@/lib/Colors';

type StyleTextProps = Omit<TextProps, 'style'> & {
    children: ReactNode,
    style?: TextStyle,
    color?: Color,
    numberOfLines?: number
};

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
        fontFamily: 'Karla',
        fontSize: 18,
        lineHeight: 20,
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

