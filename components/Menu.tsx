export { Menu as default, MenuItem };

import type { MenuItem } from '@/lib/database';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { H3, P } from '@/components/StyledText';
import AutoFitImage from '@/components/AutoFitImage';
import Colors from '@/lib/Colors';

const Menu = ({ data }: { data: MenuItem[]}) => (
    <FlatList
        data={data}
        keyExtractor={(item, i) => item.name + i}
        renderItem={({item}) => <MenuItem {...item} />}
        ItemSeparatorComponent={() => <Separator />}
    />
)

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
            <H3 color={Colors.green}>${price}</H3>
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
})