export { Main as default };

import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/app/screens/HomeScreen";
import OnboardingScreen from "@/app/screens/OnboardingScreen";
import ProfileScreen from "@/app/screens/ProfileScreen";
import Header from '@/components/Header';
import { fonts } from '@/components/StyledText';

import { SearchModeProvider } from '@/context/SearchMode';
import { LoginProvider, useLogin } from '@/context/Login';
import { ProfileProvider } from '@/context/Profile';
import { Platform } from 'react-native';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();


const Main = () =>  {
    const [loaded, error] = useFonts(fonts);

    const show = loaded || error;

    useEffect(() => { show && SplashScreen.hideAsync() }, [loaded]);
      
    return show && (
        <LoginProvider>
            <ProfileProvider>
                <SearchModeProvider>
                    <App />
                </SearchModeProvider>
            </ProfileProvider>
        </LoginProvider>
    );
};

const App = () => {
    const { isLoggedIn }= useLogin();

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Home" screenOptions={{
                // iOS requires a development build to acknowledge UIViewControllerBasedStatusBarAppearance
                // so I'm dropping it in the context of this assignment.
                ...(Platform.OS === 'ios' ? {} : {statusBarStyle: 'dark'}),
                header: Header
            }}>
                {isLoggedIn ? MainNavigation() : OnboardingNavigation()}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const MainNavigation = () => (<>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
</>)

const OnboardingNavigation = () => (
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
)