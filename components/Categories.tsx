export { Categories as default };

import { KarlaExtraBold, StyledText } from '@/components/StyledText';
import { View, ScrollView, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { Colors, Shades } from '@/lib/Colors';
import { useState } from 'react';
import { useSearchMode } from '@/context/SearchMode';

type Categories = { categories: string[] };
type Name = { name: string };

const Categories = ({ categories }:  Categories) => (
    <ScrollView horizontal style={styles.scroller} keyboardShouldPersistTaps="handled">
        <View style={styles.scrollable}>{categories.map(name => 
            <Pill key={name} name={name} />
        )}</View>
    </ScrollView>
);

const Pill = ({ name }: Name) => {
    const [active, setActive] = useState(false);
    const { onSelect } = useSearchMode();
    
    return (
        <Pressable onPress={() => {onSelect(name); setActive(a => !a)}}>
            <View style={active ? styles.activePill : styles.inactivePill}>
                <PillText color={Colors.green}>{name}</PillText>
            </View>
        </Pressable>
    );
};

const pill: ViewStyle = {
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 2,
    backgroundColor: Shades.green['10%'],
};

const styles = StyleSheet.create({
    scroller: {
        flexShrink: 0,
    },
    scrollable: {
        flexDirection: 'row',
        gap: 16,
    },
    activePill: {
        ...pill,
        borderColor: Colors.green,
    },
    inactivePill: {
        ...pill,
        borderColor: Shades.green['10%'],
    },
    pillText: {
        ...KarlaExtraBold(16),
        textTransform: 'capitalize'
    }
})

const PillText = StyledText(styles.pillText);