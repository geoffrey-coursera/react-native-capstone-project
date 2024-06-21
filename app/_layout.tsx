export { Main as default };

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/app/screens/HomeScreen";
import Header from '@/components/Header';

const Stack = createNativeStackNavigator();

const Main = () =>  (
    <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            statusBarStyle: 'dark',
            header: Header
        }}>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);