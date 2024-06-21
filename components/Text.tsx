export { Title, SubTitle };

import { ReactNode } from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '@/lib/Colors';


const Title = ({ children }: { children: ReactNode}) => (
    <Text style={styles.title}>{children}</Text>
);

const SubTitle = ({ children }: { children: ReactNode}) => (
    <Text style={styles.subtitle}>{children}</Text>
);

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
    }
})