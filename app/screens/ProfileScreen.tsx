export { ProfileScreen as default };

import { View, StyleSheet, ScrollView } from 'react-native';
import MainView from '@/components/MainView';
import { H4 } from '@/components/StyledText';
import Avatar from '@/components/Avatar';
import InputField from '@/components/InputField';
import { PrimaryButton, SecondaryButton } from '@/components/Button';
import { useRef } from 'react';
import { Shades } from '@/lib/Colors';
import Checkbox from '@/components/Checkbox';
import * as ImagePicker from 'expo-image-picker';
import { useProfile } from '@/context/Profile';
import { useLogin } from '@/context/Login';
import CustomView from '@/components/CustomView';

const ProfileScreen = () => {
    const $ = useProfile();
    const login = useLogin();

    const logOut = () => {
        $.clearAll();
        login.clearAll();
    }

    const errors = [...login.errors, ...$.errors];
    const isFormValid = errors.length === 0;

    const viewRef = useRef<ScrollView>(null);
    const scrollOffset = 300;

    return (
        <MainView ref={viewRef} style={styles.screen} scrollable>
            <View>
                <H4>Avatar</H4>
                <AvatarPicker firstName={$.firstName} lastName={$.lastName} image={$.image} setImage={$.setImage}/>
            </View>
            <Spacer />
            <Section>
                <H4>Contact information</H4>
                <FieldSet>
                    <InputField
                        required
                        label="First name"
                        value={$.firstName}
                        onChangeText={$.setFirstName}
                        scrollTo={viewRef}
                        scrollOffset={scrollOffset} />
                    <InputField
                        label="Last name"
                        isValid={$.lastName.length > 0}
                        value={$.lastName}
                        onChangeText={$.setLastName}
                        scrollTo={viewRef}
                        scrollOffset={scrollOffset} />
                    <InputField
                        required
                        label="Email"
                        keyboardType="email-address"
                        isValid={login.isEmailValid}
                        errorMessage={login.emailErrorRenderer}
                        value={$.email}
                        onChangeText={$.setEmail}
                        scrollTo={viewRef}
                        scrollOffset={scrollOffset} />
                    <InputField
                        label="Phone number"
                        keyboardType="phone-pad"
                        isValid={$.isPhoneNumberValid}
                        errorMessage={$.phoneErrorRenderer}
                        placeholder="+123-456-789-1234"
                        value={$.phoneNumber}
                        onChangeText={$.setPhoneNumber}
                        scrollTo={viewRef}
                        scrollOffset={scrollOffset} />
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
                <PrimaryButton
                    disabledReasons={errors}
                    disabled={!isFormValid}
                    onPress={$.saveProfile}
                >
                    Save changes
                </PrimaryButton>
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
});

const Spacer = CustomView(styles.spacer);

const Section = CustomView(styles.section);

const FieldSet = CustomView(styles.fieldSet);

const Row = CustomView(styles.row);