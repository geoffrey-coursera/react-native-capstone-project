export { Header as default };

import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import Logo from "@/assets/logo.png";
import { View, Text, Image, StyleSheet, ColorValue } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/lib/Colors';

const Header = ({ back }: NativeStackHeaderProps) => (
    <View style={styles.headerView}>
        <BackArrow show={!!back} />
        <Image style={styles.logo} source={Logo} />
        <Avatar name="TD" color="pink"/>
    </View>
);

type BackArrowProps = { show: boolean }

const BackArrow = ({ show }: BackArrowProps) => (
    <View style={[styles.backArrowView, { opacity: show ? 1 : 0 }]}>
        <Ionicons
            name="chevron-back"
            size={28}
            color="#495E57"
            style={{marginRight: 3}} />
    </View>
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
        marginHorizontal: 20,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
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