export { Menu as default };

import type { MenuItem } from '@/data/menuItems';
import { View, FlatList, StyleSheet, NativeScrollEvent, NativeSyntheticEvent, Keyboard } from 'react-native';
import { H3, P, StyledText, KarlaExtraBold } from '@/components/StyledText';
import AutoFitImage from '@/components/AutoFitImage';
import Colors from '@/lib/Colors';
import { useRef } from 'react';
import { useSearchMode } from '@/context/SearchMode';

const Menu = ({ data }: { data: MenuItem[] }) => {
    const { searchMode, allowExit, setSearchMode } = useSearchMode();

    const detectOverScroll = useRef<undefined | NodeJS.Timeout>(undefined);
    
    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        Keyboard.dismiss()
        const currentScrollPosition = e.nativeEvent.contentOffset.y;
        if(currentScrollPosition > 0) {
            clearTimeout(detectOverScroll.current);
        }
        allowExit.current = currentScrollPosition <= 0;
    };

    const onScrollBeginDrag = () => {
        if(allowExit.current) {
            detectOverScroll.current = setTimeout(() => setSearchMode(false), 60);
        }
    }

    return (
        <FlatList
            bounces={false}
            overScrollMode='never'
            onScrollBeginDrag={onScrollBeginDrag}
            onScroll={onScroll}
            scrollEnabled={!!searchMode}
            data={data}
            keyExtractor={(item, i) => item.name + i}
            renderItem={({item}) => <MenuItem {...item} />}
            ItemSeparatorComponent={() => <Separator />}
        />
    )
}

const Separator = () => <View style={styles.separator}></View>

const MenuItem = ({ name, description, price, image }: MenuItem) => (
    <View style={styles.menuItemWrapper}>
        <AutoFitImage
            position='right'
            source={imageSource(image)}
            imageStyle={styles.menuItemImage}
            wrapperStyle={{flex: 1, gap: 12}}
            contentStyle={{flex: 2}}
        >
        <View style={styles.menuItemText}>
            <H3>{name}</H3>
            <P color={Colors.green} numberOfLines={2}>{description}</P>
            <Price color={Colors.green}>${price.toFixed(2)}</Price>
        </View>
        </AutoFitImage>
    </View>
);

const imageSource = (image: string) => ({uri: `https://github.com/geoffrey-coursera/react-native-capstone-project/blob/main/public/${image}?raw=true`});

const styles = StyleSheet.create({
    menuItemWrapper: {
        flexDirection: 'row',
        marginHorizontal: 12,
        marginVertical: 24
    },
    menuItemText: {
        flex: 2,
        gap: 12
    },
    menuItemImage: {
        flex: 1,
        backgroundColor: Colors.lemon
    },
    separator: {
        borderBottomColor: Colors.green,
        borderBottomWidth: 1,
        opacity: 0.1
    }
});

const Price = StyledText(KarlaExtraBold(19));