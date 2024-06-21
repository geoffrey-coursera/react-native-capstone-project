export { Hero as default };

import { View, StyleSheet, Pressable } from 'react-native';
import HeroImage from '@/assets/images/starters-plate.jpg';
import Colors from '@/lib/Colors';
import AutoFitImage from '@/components/AutoFitImage';
import SearchBar from '@/components/SearchBar';
import { Title, SubTitle, Highlight } from '@/components/StyledText';
import CollapsibleView from './CollapsibleView';
import { useSearchMode } from '@/context/SearchMode';

const Hero = () =>  {
    const { searchText, isSearchMode, setIsSearchMode } = useSearchMode();
    return (
        <CollapsibleView style={styles.heroLayout} collapsed={!!isSearchMode}>
            <View>
                <Title>Little Lemon</Title>
                <AutoFitImage
                    position='right'
                    source={HeroImage}
                    gap={12}
                    imageStyle={styles.heroImage}
                >
                    <SubTitle>Chicago</SubTitle>
                    <Highlight style={styles.heroText} >
                        We are a family owned Mediterranean restaurant,
                        focused on traditional recipes served with a modern twist.
                    </Highlight>
                </AutoFitImage>
            </View>
            <Pressable onPress={() => {setIsSearchMode('searchBar')}}>
                <SearchBar
                    editable={false}
                    placeholder="Filter by dish name"
                    value={searchText}
                />
            </Pressable>
        </CollapsibleView>
    );
}


const styles = StyleSheet.create({
    heroLayout: {
        backgroundColor: Colors.green,
        padding: 12,
        paddingBottom: 24,
        gap: 24
    },
    heroImage: {
        width: 130,
        borderRadius: 20
    },
    heroText: {
        color: Colors.paper,
        marginTop: 10
    }
})