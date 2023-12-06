import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Input = ({ labelValue, placeholderValue, onChange, keyboardType }) => {
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
        <View style={styles.container}>
            <Text style={styles.label}>{labelValue}</Text>
            <View style={styles.input}>
                <TextInput
                    placeholder={placeholderValue}
                    onChangeText={onChange}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
        </View >
    )
}

export default Input

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 16,
    },
    label: {
        fontFamily: 'Nunito-Bold',
        color: '#000',
        fontSize: 14,
    },
    input: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 8,
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
});