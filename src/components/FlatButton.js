import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const FlatButton = ({textValue, onPress, backgroundColor, colorText}) => {
    const [fontsLoaded] = useFonts({
        'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
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
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button, { backgroundColor: backgroundColor }]}>
                <Text style={[styles.buttonText, {color: colorText}]}>{textValue}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default FlatButton

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'Nunito-Bold',
        fontWeight: 'bold',
    },
});