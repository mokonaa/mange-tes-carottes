import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const ContainerText = ({ titleValue, textValue }) => {
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
        <View style={styles.container}>
            <Text style={styles.title}>{titleValue}</Text>
            <Text style={styles.body}>{textValue}</Text>
        </View>
    )
}

export default ContainerText

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 16,
    },
    title: {
        fontFamily: 'Nunito-ExtraBold',
        color: '#000',
        fontSize: 32,
    },
    body: {
        fontSize: 14,
        fontFamily: 'Nunito-Medium',
        color: '#696969',
        width: '85%'
    }
});