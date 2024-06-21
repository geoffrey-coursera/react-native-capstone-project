export { Main as default };

import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/app/screens/HomeScreen";
import Header from '@/components/Header';
import { fonts } from '@/components/StyledText';

import { SearchModeProvider } from '@/context/SearchMode';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();


const Main = () =>  {
    const [loaded, error] = useFonts(fonts);

    const show = loaded || error;

    useEffect(() => { show && SplashScreen.hideAsync() }, [loaded]);
      
    return show && (
        <SearchModeProvider>
            <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName="Home" screenOptions={{
                    statusBarStyle: 'dark',
                    header: Header
                }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </SearchModeProvider>
    );
};