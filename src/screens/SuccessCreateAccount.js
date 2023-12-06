import { View, StyleSheet, SafeAreaView, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import Logo from '../assets/logo-solo.svg';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import FlatButton from '../components/FlatButton';
import ContainerText from '../components/ContainerText';
import InputPassword from '../components/InputPassword';
import BackButton from '../components/BackButton';
import ContainerTextSide from '../components/ContainerTextSide';

SplashScreen.preventAutoHideAsync();

function SuccessCreateAccount({ navigation }) {

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
                <Logo style={styles.logo} height={34} width={35} />
                <View style={styles.containerText}>
                    <ContainerTextSide 
                        textValue="Tu vas recevoir un mail dans quelques secondes sur ta boîte mail ! Tu devras appuyer sur le lien qui sera dans le mail."
                        titleValue="Yay ! Tu as créé ton compte ! "
                    />
                </View>
                <View style={styles.button}>
                    <FlatButton
                        textValue="Retouner à l'accueil"
                        backgroundColor="#2A843D"
                        colorText="#fff"
                        onPress={() => navigation.navigate('Home')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SuccessCreateAccount;

const styles = StyleSheet.create({
    wholeContainer: {
        paddingTop: 40,
        paddingBottom: 8,
        paddingHorizontal: 24,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        paddingTop: 8,
        width: '100%',
        gap: 16,
    },
});
