export { Header as default };

import Logo from "@/assets/images/logo.png";
import { View, Text, Image, StyleSheet, Pressable, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/lib/Colors';

import { useEffect, useRef } from "react";
import { useSearchMode } from '@/context/SearchMode';
import SearchBar from "@/components/SearchBar";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";

const Header = ({ back }: { back?: unknown }) => {
    const { isSearchMode, searchText, setSearchText, setIsSearchMode, onSearch } = useSearchMode();
    const showBack = !!back || !!isSearchMode;

    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if(isSearchMode === 'searchBar') setTimeout(() => {
            inputRef.current?.focus();
        }, 20);
    }, [isSearchMode]);

    useUpdateEffect(() => {
        onSearch(searchText)
    }, [searchText])

    return (
        <View style={[styles.headerView, isSearchMode && { backgroundColor: Colors.green}]}>
            <BackArrow show={showBack} onPress={() => {setIsSearchMode(false)}} />
            {isSearchMode
            ? <SearchBar
                ref={inputRef}
                placeholder="Filter by dish name"
                onChangeText={setSearchText}
                value={searchText}
                style={{ flex: 1 }}
            />
            : <>
                <Image style={styles.logo} source={Logo} />
                <Avatar name="TD" color="pink"/>
            </>}
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
        height: 80,
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