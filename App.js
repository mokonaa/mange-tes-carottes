import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import LogInScreen from './src/screens/LogInScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function App() {
  const Stack = createNativeStackNavigator();
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Creer" component={SignInScreen} options={{headerShown: false}} />
        <Stack.Screen name="Connecter" component={LogInScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>  
  );
}
