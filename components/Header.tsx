export { Header as default };

import Logo from "@/assets/images/logo.png";
import { View, Image, StyleSheet, Pressable, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/lib/Colors';

import { useEffect, useRef } from "react";
import { useSearchMode } from '@/context/SearchMode';
import SearchBar from "@/components/SearchBar";
import SwitchView from "@/components/SwitchView";
import Avatar from "@/components/Avatar";
import { MarkaziText, StyledText } from "@/components/StyledText";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useLogin } from "@/context/Login";
import { useProfile } from "@/context/Profile";

const headerHeight = 80;

const Header = ({ back, route }: NativeStackHeaderProps) => {
    const searchMode = useSearchMode();
    return (
        <SwitchView height={headerHeight} active={searchMode.searchMode ? 1 : 0}>
            {!back
                ? <HomeHeader />
                : <SubScreenHeader title={route.name} />
            }
            <SearchModeHeader {...searchMode}/>
        </SwitchView>
    )
};

const HomeHeader = () => {
    const { isLoggedIn } = useLogin();
    const { firstName, lastName, image} = useProfile();
    const { navigate } = useNavigation<NavigationProp<{Profile: any}>>();

    return (
        <View style={styles.headerView}>
            <Placeholder />
            <Image style={styles.logo} source={Logo} />
            {
            !isLoggedIn
                ? <Placeholder />
                : <Pressable onPress={() => navigate('Profile')}>
                    <Avatar firstName={firstName} lastName={lastName} uri={image}/>
                  </Pressable>
            }
        </View>
    );
};

const SubScreenHeader = ({ title }: { title: string }) => (
    <View style={[styles.headerView, styles.subScreen]}>
        <BackArrow show={true} onPress={useNavigation().goBack} />
        <HeaderText style={styles.title} noDescenders>{title}</HeaderText>
        <Placeholder />
    </View>
);

type SearchModeHeaderProps = ReturnType<typeof useSearchMode>;

const SearchModeHeader = ({ query, setQuery, searchMode, exitSearchMode, onSearch }: SearchModeHeaderProps) => {
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if(searchMode === 'searchBar') setTimeout(() => {
            inputRef.current?.focus();
        }, 20);
    }, [searchMode]);

    useUpdateEffect(() => onSearch(query), [query]);

    return (
        <View style={[styles.headerView, { backgroundColor: Colors.green}]}>
            <BackArrow show={true} onPress={exitSearchMode} />
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
    <Pressable onPress={onPress} style={styles.placeholder}>
        <View style={[styles.backArrowView, { opacity: show ? 1 : 0 }]}>
            <Ionicons
                name="chevron-back"
                size={28}
                color="#495E57"
                style={{marginRight: 3}} />
        </View>
    </Pressable>
);

const Placeholder = () => <View style={styles.placeholder}></View>;

const HeaderText = StyledText(MarkaziText(32));

const styles = StyleSheet.create({
    headerView: {
        paddingHorizontal: 20,
        height: headerHeight,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.paper,
        gap: 12
    },
    subScreen: {
        backgroundColor: Colors.green
    },
    logo: {
        marginRight: 10,
        height: 40,
        flex: 1,
        resizeMode: 'contain'
    },
    backArrowView: {
        height: 40,
        width: 40,
        backgroundColor: Colors.lemon,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    placeholder: {
        width: 50
    },
    title: {
        flex: 1,
        textAlign: "center",
        color: Colors.paper
    }
})