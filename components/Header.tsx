export { Header as default };

import Logo from "@/assets/images/logo.png";
import { View, Text, Image, StyleSheet, Pressable, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/lib/Colors';

import { useEffect, useRef } from "react";
import { useSearchMode } from '@/context/SearchMode';
import SearchBar from "@/components/SearchBar";
import SwitchView from "@/components/SwitchView";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";

const headerHeight = 80;

const Header = ({ back }: { back?: unknown }) => {
    const searchMode = useSearchMode();
    
    return (
        <SwitchView height={headerHeight} active={searchMode.searchMode ? 1 : 0}>
            <StackHeader showBackArrow={!!back}/>
            <SearchModeHeader {...searchMode}/>
        </SwitchView>
    )
};

type StackHeaderProps = { showBackArrow: boolean };

const StackHeader = ({ showBackArrow }: StackHeaderProps) => (
    <View style={styles.headerView}>
        <BackArrow show={showBackArrow} onPress={() => {}} />
        <Image style={styles.logo} source={Logo} />
        <Avatar name="TD" color="pink"/>
    </View>
);

type SearchModeHeaderProps = ReturnType<typeof useSearchMode>;

const SearchModeHeader = ({ query, setQuery, searchMode, setSearchMode, onSearch }: SearchModeHeaderProps) => {
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if(searchMode === 'searchBar') setTimeout(() => {
            inputRef.current?.focus();
        }, 20);
    }, [searchMode]);

    useUpdateEffect(() => onSearch(query), [query]);

    return (
        <View style={[styles.headerView, { backgroundColor: Colors.green}]}>
            <BackArrow show={true} onPress={() => {setSearchMode(false)}} />
            <SearchBar
                ref={inputRef}
                placeholder="Filter by dish name"
                onChangeText={setQuery}
                value={query}
                style={{ flex: 1 }}
            />
        </View>
    )
};

type BackArrowProps = { show: boolean, onPress: () => void }

const BackArrow = ({ show, onPress }: BackArrowProps) => (
    <Pressable onPress={onPress}>
        <View style={[styles.backArrowView, { opacity: show ? 1 : 0 }]}>
            <Ionicons
                name="chevron-back"
                size={28}
                color="#495E57"
                style={{marginRight: 3}} />
        </View>
    </Pressable>
);
    

type AvatarProps = PictureAvatar | InitialsAvatar;
type PictureAvatar = { source: ImageURISource };
type InitialsAvatar = { name: string, color: ColorValue };

const Avatar = (props: AvatarProps) => 'name' in props ? (
    <View style={styles.avatarInitials}>
        <Text>{props.name}</Text>
    </View>
) : (
    <Image style={styles.avatarPicture} source={props.source}/>
);

const styles = StyleSheet.create({
    headerView: {
        paddingHorizontal: 20,
        height: headerHeight,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.paper,
        gap: 12
    },
    logo: {
        height: 40,
        flex: 1,
        resizeMode: 'contain'
    },
    avatarInitials: {
        height: 50,
        width: 50,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    avatarPicture: {
        height: 50,
        width: 50,
        resizeMode: 'cover',
        borderRadius: 25,
    },
    backArrowView: {
        height: 40,
        width: 40,
        backgroundColor: Colors.lemon,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
})