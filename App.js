import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import SignInStep1 from './src/screens/SignInStep1Screen';
import SignInStep2 from './src/screens/SignInStep2Screen';
import SuccessCreateAccount from './src/screens/SuccessCreateAccount';
import LogInScreen from './src/screens/LogInScreen';
import SuccessSignIn from './src/screens/SuccessSignIn';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function App() {
  const Stack = createNativeStackNavigator();
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="CreerStep1" component={SignInStep1} options={{headerShown: false}} />
        <Stack.Screen name="CreerStep2" component={SignInStep2} options={{headerShown: false}} />
        <Stack.Screen name="SignInStep3" component={SuccessCreateAccount} options={{headerShown: false}} />
        <Stack.Screen name="Connecter" component={LogInScreen} options={{headerShown: false}} />
        <Stack.Screen name="SuccessSignIn" component={SuccessSignIn} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>  
  );
}
