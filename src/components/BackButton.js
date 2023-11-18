import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Arrow from '../assets/icons/arrow.svg'
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const BackButton = ({ onPress }) => {
    const [fontsLoaded] = useFonts({
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
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Arrow height={16} width={16} />
            <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
    )
}

export default BackButton

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
    },
    buttonText: {
        paddingLeft: 8,
        fontFamily: 'Nunito-Medium',
    },
});