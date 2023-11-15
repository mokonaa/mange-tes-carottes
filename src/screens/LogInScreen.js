import { View, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import Logo from '../assets/logo-solo.svg';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import FlatButton from '../components/FlatButton';
import ContainerText from '../components/ContainerText';
import Input from '../components/Input';
import supabase from '../config/supabaseClient';

SplashScreen.preventAutoHideAsync();

function LogInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signIn, setSignIn] = useState(false);

    const handleInputChange = (value, inputName) => {
        switch (inputName) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };
    const logIn = async () => {
        try {
            const { user, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                console.error('Error signing in:', error.email);
                return;
            }
            console.log('User signed in:', email);
            setSignIn(true);
        } catch (error) {
            console.error('Unexpected error:', error.message);
        }
    };

    const [fontsLoaded] = useFonts({
        'Nunito-ExtraBold': require('../assets/fonts/Nunito-ExtraBold.ttf'),
        'Nunito-Medium': require('../assets/fonts/Nunito-Medium.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <View style={styles.containerInputText}>
                <Logo style={styles.logo} height={34} width={35} />
                <ContainerText
                    textValue="Tu peux te connecter !"
                    titleValue="Hello toi !"
                />
                <View style={styles.containerInput}>
                    <Input
                        labelValue="Adresse email"
                        placeholderValue="Entre ton adresse email"
                        onChange={(text) => handleInputChange(text, 'email')}
                    />
                    <Input
                        labelValue="Mot de passe"
                        placeholderValue="Entre ton mot de passe"
                        onChange={(text) => handleInputChange(text, 'password')}
                        valuePassword={true}
                    />
                </View>
            </View>
            {signIn ? (
                <Text>Yes t'es connecté !</Text>
            ) : (
                <Text>Tu n'es pas connecté</Text>
            )}
            <View style={styles.containerButtons}>
                <FlatButton
                    textValue="Se connecter"
                    onPress={logIn}
                    backgroundColor="#2A843D"
                    colorText="#fff"
                />
            </View>
        </View>
    );
}

export default LogInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 24,
        paddingVertical: 48,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 48,
    },
    containerInputText: {
        alignItems: 'center',
        width: '100%',
        gap: 40,
    },
    containerInput: {
        width: '100%',
        gap: 16,
    },
    containerText: {
        gap: 8,
        width: '100%',
    },
    containerButtons: {
        width: '100%',
    },
});
