export { OnboardingScreen as default };

import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import MainView from '@/components/MainView';
import { H4, Highlight } from '@/components/StyledText';
import KeyboardAwareView from '@/components/KeyboardAwareView';
import { Colors, Shades } from '@/lib/Colors';

import { useLogin } from '@/context/Login';
import { useState } from 'react';
import InputField from '@/components/InputField';

// I use a static height to ensure it isn't resized by the keyboard on Android
const headerHeight = 80;
const screenHeight = Dimensions.get('window').height - headerHeight;

const OnboardingScreen = () => {
    const { firstName, setFirstName, email, setEmail, isFormValid, logIn } = useLogin();
    const { spacing, adjustSpacing } = useSpacing();

    return (
        <MainView>
            <KeyboardAwareView onLayout={adjustSpacing} height={screenHeight}>
                <View style={[styles.form, { paddingBottom: spacing }]}>
                    <H4 style={styles.greeting}>Let us get to know you</H4>
                    <View style={styles.fieldSet}>
                        <InputField
                            label="First name"
                            value={firstName}
                            onChangeText={setFirstName} />
                        <InputField
                            label="email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail} />
                    </View>
                </View>
                <View style={styles.footer}>
                    <NextButton disabled={!isFormValid} onPress={logIn}/>
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


type NextButtonProps = { disabled?: boolean, onPress: () => void };

const NextButton = ({ disabled, onPress }: NextButtonProps) => (
    <Pressable onPress={onPress}>
        <View style={[styles.button, disabled && styles.buttonInactive]}>
            <Highlight color={Colors[disabled ? 'text' : 'paper']}>Next</Highlight>
        </View>
    </Pressable>
);

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
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        minWidth: 100,
        borderRadius: 12,
        backgroundColor: Colors.green
    }, 
    buttonInactive: {
        backgroundColor: Shades.green['10%']
    }
});