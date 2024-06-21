export { Hero as default };

import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HeroImage from '@/assets/images/starters-plate.jpg';
import Colors from '@/lib/Colors';
import AutoFitImage from '@/components/AutoFitImage';
import SearchBar from '@/components/SearchBar';
import { Title, SubTitle, Highlight } from '@/components/StyledText';

const Hero = ({ onSearch }: { onSearch: (a: string) => void}) => {
    const [searchBarText, setSearchBarText] = useState('');

    const handleSearchChange = (text: string) => {
        setSearchBarText(text);
        onSearch(text);
    };

    return (
        <View style={styles.heroLayout}>
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
            <SearchBar
                placeholder="Filter by dish name"
                onChangeText={handleSearchChange}
                value={searchBarText}
            />
        </View>
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