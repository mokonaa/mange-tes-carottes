import { View, StyleSheet, ScrollView, SafeAreaView, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import Logo from '../assets/logo-solo.svg';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import FlatButton from '../components/FlatButton';
import ContainerText from '../components/ContainerText';
import InputPassword from '../components/InputPassword';
import supabase from '../config/supabaseClient';
import BackButton from '../components/BackButton';

SplashScreen.preventAutoHideAsync();

function SignInStep2({ route, navigation }) {
    const { pseudo, prenom, email } = route.params;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const arePasswordsEqual = password === confirmPassword;
    const handleInputChange = (value, inputName) => {
        switch (inputName) {
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    };

    const handleButtonPress = async () => {
        const allInputsFilled = pseudo.trim() !== '' && prenom.trim() !== '' && email.trim() !== '';
        const isValidPassword = password.length >= 6;
    
        if (!allInputsFilled) {
            Alert.alert('Les champs ne sont pas remplis', 'Tu n\'as pas rempli tous les champs.');
        } else if (!isValidPassword) {
            Alert.alert('Mot de passe invalide', 'Le mot de passe doit avoir au moins 6 caractères.');
        } else if (!arePasswordsEqual) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
        } else {
            try {
                const { user, error } = await supabase.auth.signUp({
                    email: email,
                    password: password,
                });
    
                if (error) {
                    console.error('Erreur : ', error.message);
                    return;
                }
                const { data, error: sqlError } = await supabase
                    .from('utilisateurs')
                    .insert([
                        { pseudo: pseudo, prenom: prenom, email: email },
                    ])
                    navigation.navigate('SignInStep3');
    
                if (sqlError) {
                    console.error('Error executing SQL query:', sqlError.message);
                    return;
                }
            } catch (error) {
                console.error('Unexpected error:', error.message);
            }
        };
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
        <SafeAreaView>
            <View style={styles.wholeContainer}>
                <BackButton onPress={() => navigation.navigate('CreerStep1')} />
                <ScrollView style={styles.container} onLayout={onLayoutRootView}>
                    <View style={styles.containerInputText}>
                        <Logo style={styles.logo} height={34} width={35} />
                        <ContainerText
                            textValue="Il manque plus que ton mot de passe à rajouter !"
                            titleValue="Créer ton compte"
                        />
                        <View style={styles.containerInput}>
                            <InputPassword
                                labelValue="Mot de passe"
                                placeholderValue="Entre ton mot de passe"
                                onChange={(text) => handleInputChange(text, 'password')}
                                valuePassword={true}
                            />
                            <InputPassword
                                labelValue="Confirme ton mot de passe"
                                placeholderValue="Entre à nouveau ton mot de passe"
                                onChange={(text) => handleInputChange(text, 'confirmPassword')}
                                valuePassword={true}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.containerButtons}>
                    <View style={styles.subcontainerButtons}>
                        <Text style={styles.textLogInButton}>
                            Tu as déjà un compte ?
                        </Text>
                        <Text
                            style={styles.logInButton}
                            onPress={() => navigation.navigate('Connecter')}
                        >
                            Connecte-toi
                        </Text>
                    </View>
                    <FlatButton
                        textValue="S'inscrire"
                        onPress={handleButtonPress}
                        backgroundColor="#2A843D"
                        colorText="#fff"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SignInStep2;

const styles = StyleSheet.create({
    wholeContainer: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        height: '100%',
        justifyContent: 'space-between',
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
    subcontainerButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textLogInButton: {
        fontFamily: 'Nunito-Medium',
    },
    logInButton: {
        paddingLeft: 4,
        fontFamily: 'Nunito-Medium',
        color: '#CC4B00',
        textDecorationLine: 'underline',
    },
    forgot: {
        fontFamily: 'Nunito-Medium',
        textAlign: 'right',
        color: '#CC4B00',
    },
});
