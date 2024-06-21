export { Avatar as default };

import { View, Image, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Colors from '@/lib/Colors';
import { Highlight } from '@/components/StyledText';


type AvatarProps = {
    style?: StyleProp<ViewStyle>,
    size?: number,
    uri?: string,
    firstName?: string
    lastName?: string
};

const Avatar = (props: AvatarProps) => (
    props.uri
    ? <PictureAvatar {...props} />
    : <InitialsAvatar {...props} />
);

const PictureAvatar = ({ uri, size }: AvatarProps) => (
    <Image style={[styles.avatarPicture, overrideSize(size)]} source={{uri}}/>
);

const InitialsAvatar = ({ firstName, lastName, style, size }: AvatarProps) => (
    <View style={[styles.avatarInitials, style, overrideSize(size)]}>
        <Highlight size={size && size / 3.125}>{formatInitials(firstName, lastName)}</Highlight>
    </View>
);

const formatInitials = (firstName?: string, lastName?: string) =>
    lastName ? (firstName ?? '')[0].toUpperCase() + lastName[0].toUpperCase()
    : firstName ? firstName[0].toUpperCase() + firstName.slice(1, 2) || ''
    : '';

const styles = StyleSheet.create({
    avatarWrapper: {
        height: 50,
        width: 50,
        backgroundColor: Colors.lemon,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    avatarInitials: {
        height: 50,
        width: 50,
        backgroundColor: Colors.lemon,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    avatarPicture: {
        height: 50,
        width: 50,
        resizeMode: 'cover',
        borderRadius: 25,
    }
})

const overrideSize = (size?: number) =>
    size === undefined ? size
    : { height: size, width: size, borderRadius: size/2 };

