import { View, StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native';
import React, { useState } from 'react';
import Logo from '../assets/logo-solo.svg';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import FlatButton from '../components/FlatButton';
import ContainerText from '../components/ContainerText';
import Input from '../components/Input';
import supabase from '../config/supabaseClient';
import BackButton from '../components/BackButton';
import InputPassword from '../components/InputPassword';

SplashScreen.preventAutoHideAsync();

function SignInScreen({ navigation }) {
    // States to hold the values of the TextInputs
    const [pseudo, setPseudo] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (value, inputName) => {
        // Update the corresponding state based on the inputName
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
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    async function signIn() {

        console.log('Pseudo:', pseudo);
        console.log('Prénom:', prenom);
        console.log('Adresse email:', email);
        console.log('Mdp:', password);
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
                ]);

            if (sqlError) {
                console.error('Error executing SQL query:', sqlError.message);
                // Handle the SQL error
                return;
            }

            // SQL query executed successfully
            console.log('User registered and SQL query executed:', data);
        } catch (error) {
            console.error('Unexpected error:', error.message);
            // Handle unexpected errors
        }
    }

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
                                onChange={(text) => handleInputChange(text, 'email')}
                            />
                            <InputPassword
                                labelValue="Mot de passe"
                                placeholderValue="Entre ton mot de passe"
                                onChange={(text) => handleInputChange(text, 'password')}
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
                        <Text style={styles.logInButton} onPress={() => navigation.navigate('Connecter')}>
                            Connecte-toi
                        </Text>
                    </View>
                    <FlatButton
                        textValue="Suivant"
                        onPress={signIn}
                        backgroundColor="#2A843D"
                        colorText="#fff"
                    />
                </View>
            </View>
        </SafeAreaView>


    );
}

export default SignInScreen;

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
        color: "#CC4B00",
        textDecorationLine: 'underline',
    },
    forgot: {
        fontFamily: 'Nunito-Medium',
        textAlign: 'right',
        color: "#CC4B00",
    }
});
