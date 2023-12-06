import { View, StyleSheet, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Logo from '../assets/logo-solo.svg';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import FlatButton from '../components/FlatButton';
import ContainerText from '../components/ContainerText';
import Input from '../components/Input';
import InputPassword from '../components/InputPassword';
import supabase from '../config/supabaseClient';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';

SplashScreen.preventAutoHideAsync();

function LogInScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            const { data: { user } } = await supabase.auth.getUser()
            console.log('User Object:', user);
            if (error) {
                console.error('Error signing in:', error.message);
                return;
            }
            console.log('User signed in with email:', user.email);
            navigation.navigate('SuccessSignIn', { userEmail: user.email });
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
        <SafeAreaView onLayout={onLayoutRootView}>
            <View style={styles.wholeContainer}>
                <BackButton onPress={() => navigation.navigate('Home')} />
                <ScrollView style={styles.container}>
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
                            <View style={styles.containerPassword}>
                                <InputPassword
                                    labelValue="Mot de passe"
                                    placeholderValue="Entre ton mot de passe"
                                    onChange={(text) => handleInputChange(text, 'password')}
                                    passwordType
                                />
                                <Text style={styles.forgot} onPress={() => navigation.navigate('Home')}>
                                    Mot de passe oublié ?
                                </Text>
                            </View>

                        </View>
                    </View>
                    {/* {signIn ? (
                        <Text>Yes t'es connecté !</Text>
                    ) : (
                        <Text>Tu n'es pas connecté</Text>
                    )} */}
                </ScrollView>
                <View style={styles.containerButtons}>
                    <View style={styles.subcontainerButtons}>
                        <Text style={styles.textSignInButton}>
                            Pas de compte ?
                        </Text>
                        <Text style={styles.signInButton} onPress={() => navigation.navigate('CreerStep1')}>
                            Inscris-toi !
                        </Text>
                    </View>
                    <FlatButton
                        textValue="Suivant"
                        onPress={logIn}
                        backgroundColor="#2A843D"
                        colorText="#fff"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}


export default LogInScreen;

const styles = StyleSheet.create({
    wholeContainer: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        height: '100%',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
    },
    containerInputText: {
        alignItems: 'center',
        width: '100%',
        paddingVertical: 16,
        gap: 24,
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
        paddingTop: 8,
        width: '100%',
        gap: 16,
    },
    containerPassword: {
        gap: 16
    },
    subcontainerButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textSignInButton: {
        fontFamily: 'Nunito-Medium',
    },
    signInButton: {
        paddingLeft: 4,
        fontFamily: 'Nunito-Medium',
        color: "#CC4B00",
        textDecorationLine: 'underline',
    },
    forgot: {
        fontFamily: 'Nunito-Medium',
        textAlign: 'right',
        color: "#CC4B00",
    }
});
