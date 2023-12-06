import { View, StyleSheet, ScrollView, SafeAreaView, Text, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo-solo.svg';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import FlatButton from '../components/FlatButton';
import ContainerText from '../components/ContainerText';
import Input from '../components/Input';
import BackButton from '../components/BackButton';

import { supabase } from '../config/supabaseClient';

SplashScreen.preventAutoHideAsync();

function SignInStep1({ navigation }) {
    const [pseudo, setPseudo] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [isButtonDisabled, setButtonDisabled] = useState(true);

    const handleInputChange = (value, inputName) => {
        switch (inputName) {
            case 'pseudo':
                setPseudo(value);
                break;
            case 'prenom':
                setPrenom(value);
                break;
            case 'email':
                setEmail(value);
                break;
            default:
                break;
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        const allInputsFilled = pseudo.trim() !== '' && prenom.trim() !== '' && email.trim() !== '';
        setButtonDisabled(!allInputsFilled);
    }, [pseudo, prenom, email]);

    const handleButtonPress = async () => {
        const allInputsFilled = pseudo.trim() !== '' && prenom.trim() !== '' && email.trim() !== '';
        if (!allInputsFilled) {
            Alert.alert('Les champs ne sont pas remplis', 'Tu n\'as pas rempli tous les champs.');
        } else {
            if (!isValidEmail(email)) {
                Alert.alert('Ton adresse email est invalide', 'Entre une adresse email valide.');
            } else {
                try {
                    const { data, error } = await supabase
                        .from('utilisateurs')
                        .select('*')
                        .eq('email', email);

                    if (error) {
                        console.error('Error fetching user:', error.message);
                        return;
                    }

                    if (data && data.length > 0) {
                        Alert.alert('L\'adresse email existe', 'Cette adresse email est déjà utilisée.');
                    } else {
                        navigation.navigate('CreerStep2', { pseudo, prenom, email });
                    }
                } catch (error) {
                    console.error('Une erreur est survenue', error.message);
                }
            }
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
        <SafeAreaView>
            <View style={styles.wholeContainer}>
                <BackButton onPress={() => navigation.navigate('Home')} />
                <ScrollView style={styles.container} onLayout={onLayoutRootView}>
                    <View style={styles.containerInputText}>
                        <Logo style={styles.logo} height={34} width={35} />
                        <ContainerText
                            textValue="Super ! Tu peux commencer avec la création de ton compte !"
                            titleValue="Créer ton compte"
                        />
                        <View style={styles.containerInput}>
                            <Input
                                labelValue="Pseudo"
                                placeholderValue="Entre ton pseudo"
                                onChange={(text) => handleInputChange(text, 'pseudo')}
                            />
                            <Input
                                labelValue="Prénom"
                                placeholderValue="Entre ton prénom"
                                onChange={(text) => handleInputChange(text, 'prenom')}
                            />
                            <Input
                                labelValue="Adresse email"
                                placeholderValue="Entre ton adresse email"
                                keyboardType="email-address"
                                onChange={(text) => handleInputChange(text, 'email')}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.containerButtons}>
                    <View style={styles.subcontainerButtons}>
                        <Text style={styles.textLogInButton}>
                            Tu as déjà un compte ?
                        </Text>
                        <Text style={styles.logInButton} onPress={() => navigation.navigate('Connecter')}>
                            Connecte-toi
                        </Text>
                    </View>
                    <FlatButton
                        textValue="Suivant"
                        onPress={handleButtonPress}
                        backgroundColor="#2A843D"
                        colorText="#fff"
                        disabled={isButtonDisabled}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SignInStep1;

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
