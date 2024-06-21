export { OnboardingScreen as default };

import { View, StyleSheet, Dimensions } from 'react-native';
import MainView from '@/components/MainView';
import { H4 } from '@/components/StyledText';
import KeyboardAwareView from '@/components/KeyboardAwareView';
import { Colors, Shades } from '@/lib/Colors';

import { useLogin } from '@/context/Login';
import { useState } from 'react';
import InputField from '@/components/InputField';
import { PrimaryButton } from '@/components/Button';

// I use a static height to ensure it isn't resized by the keyboard on Android
const headerHeight = 80;
const screenHeight = Dimensions.get('window').height - headerHeight;

const OnboardingScreen = () => {
    const $ = useLogin();
    const { spacing, adjustSpacing } = useSpacing();
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const onLayout = (keyboardHeight: number) => {
        adjustSpacing(keyboardHeight)
        setKeyboardVisible(Boolean(keyboardHeight));
    };

    return (
        <MainView>
            <KeyboardAwareView onLayout={onLayout} height={screenHeight}>
                <View style={[styles.form, { paddingBottom: spacing }]}>
                    {!keyboardVisible &&
                        <H4 style={styles.greeting}>Let us get to know you</H4>
                    }
                    <View style={styles.fieldSet}>
                        <InputField
                            required
                            label="First name"
                            value={$.firstName}
                            onChangeText={$.setFirstName} />
                        <InputField
                            required
                            label="Email"
                            isValid={$.isEmailValid}
                            inlineErrorMessage="invalid email address"
                            keyboardType="email-address"
                            value={$.email}
                            onChangeText={$.setEmail} />
                    </View>
                </View>
                <View style={styles.footer}>
                    <PrimaryButton
                        style={styles.button}
                        disabledReasons={$.errors}
                        disabled={!$.isFormValid}
                        onPress={$.logIn}
                    >
                        Next
                    </PrimaryButton>
                </View>
            </KeyboardAwareView>
        </MainView>
    )
};

/** add some breathing room bellow the content */
const useSpacing = () => {
    const [spacing, setSpacing] = useState<number>(calcSpacing(screenHeight, 0));
    const adjustSpacing = (keyboardHeight: number) => {
        setSpacing(calcSpacing(screenHeight, keyboardHeight))
    };

    return {spacing, adjustSpacing}
}

const calcSpacing = (screenHeight: number, keyboardHeight: number) =>
    3.5 * (screenHeight - keyboardHeight) ** 3 / 10**7


const styles = StyleSheet.create({
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        flex: 1,
        backgroundColor: Shades.green['5%']
    },
    greeting: {
        color: Colors.green,
        textAlign: 'center'
    },
    fieldSet: {
        gap: 24,
        width: 250
    },
    footer: {
        width: 250,
        height: headerHeight,
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignSelf: 'center',
        marginBottom: 12
    },
    button: { minWidth: 100 }, 
});