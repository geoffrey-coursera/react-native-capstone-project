export { Main as default };

import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/app/screens/HomeScreen";
import Header from '@/components/Header';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

const Main = () =>  {
    const [loaded, error] = useFonts({
        MarkaziText: require('@/assets/fonts/MarkaziText.ttf'),
        Karla: require('@/assets/fonts/Karla.ttf'),
    });

    const show = loaded || error;

    useEffect(() => { show && SplashScreen.hideAsync() }, [loaded]);
      
    return show && (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Home" screenOptions={{
                statusBarStyle: 'dark',
                header: Header
            }}>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};