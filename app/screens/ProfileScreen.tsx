export { ProfileScreen as default };

import { View, StyleSheet } from 'react-native';
import MainView from '@/components/MainView';
import { H4 } from '@/components/StyledText';
import Avatar from '@/components/Avatar';
import InputField from '@/components/InputField';
import { PrimaryButton, SecondaryButton } from '@/components/Button';
import { ReactNode } from 'react';
import { Shades } from '@/lib/Colors';
import Checkbox from '@/components/Checkbox';
import * as ImagePicker from 'expo-image-picker';
import { useProfile } from '@/context/Profile';
import { useLogin } from '@/context/Login';

const ProfileScreen = () => {
    const $ = useProfile();
    const login = useLogin();

    const logOut = () => {
        $.clearAll();
        login.clearAll();
    }

    return (
        <MainView style={styles.screen} scrollable>
            <View>
                <H4>Avatar</H4>
                <AvatarPicker firstName={$.firstName} lastName={$.lastName} image={$.image} setImage={$.setImage}/>
            </View>
            <Spacer />
            <Section>
                <H4>Contact information</H4>
                <FieldSet>
                    <InputField
                        label="First name"
                        value={$.firstName}
                        onChangeText={$.setFirstName} />
                    <InputField
                        label="Last name"
                        value={$.lastName}
                        onChangeText={$.setLastName} />
                    <InputField
                        label="Email"
                        keyboardType="email-address"
                        value={$.email}
                        onChangeText={$.setEmail} />
                    <InputField
                        label="Phone number"
                        keyboardType="phone-pad"
                        value={$.phoneNumber}
                        onChangeText={$.setPhoneNumber} />
                </FieldSet>
            </Section>
            <Spacer />
            <Section>
                <H4>Email notifications</H4>
                <FieldSet>
                    <Checkbox label="Order statuses" checked={$.orderStatus} onToggle={$.setOrderStatus}/>
                    <Checkbox label="Password changes" checked={$.passwordChange} onToggle={$.setPasswordChange}/>
                    <Checkbox label="Special offers" checked={$.specialOffer} onToggle={$.setSpecialOffer}/>
                    <Checkbox label="Newsletter" checked={$.newsletter} onToggle={$.setNewsLetter}/>
                </FieldSet>
            </Section>
            <Spacer />
            <Row>
                <PrimaryButton onPress={() => {}}>Save changes</PrimaryButton>
                <SecondaryButton style={{flex: 1}} onPress={() => {}}>Discard changes</SecondaryButton>
            </Row>
            <Spacer />
            <PrimaryButton onPress={logOut}>Log out</PrimaryButton>
        </MainView>
    )
};

type AvatarPickerProps = {
    firstName: string,
    lastName: string,
    image: string,
    setImage: (src: string) => void
}

const AvatarPicker = ({ firstName, lastName, image, setImage }: AvatarPickerProps) => {
    const pickImage = () => ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    }).then(result =>!result.canceled && setImage(result.assets[0].uri));

    return (
        <View style={{ gap: 12, alignItems: 'center'}}>
            <Avatar size={120} firstName={firstName} lastName={lastName} uri={image} />
            {image? (<Row>
                <PrimaryButton onPress={pickImage}>Replace</PrimaryButton>
                <SecondaryButton onPress={() => setImage('')}>Remove</SecondaryButton>
            </Row>) : <PrimaryButton onPress={pickImage}>Set picture</PrimaryButton>}
        </View>
    );
}

const Spacer = () => <View style={styles.spacer} />

const Section = ({ children }: { children: ReactNode }) => (
    <View style={styles.section}>{children}</View>
);

const FieldSet = ({ children }: { children: ReactNode }) => (
    <View style={styles.fieldSet}>{children}</View>
);

const Row = ({ children }: { children: ReactNode }) => (
    <View style={styles.row}>{children}</View>
)

const styles = StyleSheet.create({
    screen: {
        gap: 32,
        padding: 12,
        paddingTop: 18,
        paddingBottom: 32
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    fieldSet: {
        gap: 24,
    },
    section: {
        gap: 18,
    },
    spacer: {
        borderColor: Shades.green['10%'],
        borderBottomWidth: 1
    }
})