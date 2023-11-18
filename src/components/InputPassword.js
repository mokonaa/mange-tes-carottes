import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import EyeOpen from '../assets/icons/eye-open.svg';
import EyeClosed from '../assets/icons/eye-closed.svg';

const InputPassword = ({ labelValue, placeholderValue, onChange }) => {
    const [fontsLoaded] = useFonts({
        'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
    });
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef(null);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
        // After changing the showPassword state, focus on the input field
        inputRef.current.focus();
    };

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
            <View style={styles.inputContainer}>
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    placeholder={placeholderValue}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    enablesReturnKeyAutomatically
                />
                <TouchableOpacity style={styles.icon} onPress={toggleShowPassword}>
                    {showPassword ? <EyeClosed width={20} height={20} /> : <EyeOpen width={20} height={20} />}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default InputPassword;

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
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 8,
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    input: {
        width: '90%',
    },
    icon: {
        width: '10%',
        alignItems: 'flex-end',
    }
});
