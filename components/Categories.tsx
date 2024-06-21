export { Categories as default };

import { KarlaExtraBold, StyledText } from '@/components/StyledText';
import { View, ScrollView, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { Colors, Shades } from '@/lib/Colors';

type CategoriesProps = {
    categories: string[],
    filters: string[],
    onSelect: (filters: string[]) => void
}

const Categories = ({ categories, filters, onSelect }: CategoriesProps) => (
    <ScrollView horizontal style={styles.scroller}>
        <View style={styles.scrollable}>{
                categories.map(name => {
                const active = filters.includes(name);
                const onPress = () => onSelect(updateFilters(filters, name));

                return (
                    <Pressable key={name} onPress={onPress}>
                        <Pill name={name} active={active} />
                    </Pressable>
                );
            })
        }</View>
    </ScrollView>
);


const updateFilters = (filters: string[], name: string) => {
    const index = filters.indexOf(name);

    return (index === -1) ? filters.concat(name)
        : filters.slice(0, index).concat(filters.slice(index + 1));
};

const Pill = ({ name, active }: { name: string, active: boolean }) => (
    <View style={active ? styles.activePill : styles.inactivePill}>
        <PillText color={Colors.green}>{name}</PillText>
    </View>
);

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