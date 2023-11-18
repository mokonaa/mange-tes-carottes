import { View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo-solo.svg';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import FlatButton from '../components/FlatButton';
import ContainerText from '../components/ContainerText';
import Input from '../components/Input';
import supabase from '../config/supabaseClient';

SplashScreen.preventAutoHideAsync();

function TestScreen() {

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

    const fetchData = async () => {
        // Replace 'your_table' and 'your_column' with your actual table and column names
        const { data, error } = await supabase
            .from('utilisateurs')
            .select();

        if (error) {
            console.error('Error fetching data:', error.message);
        } else {
            console.log('Fetched data:', data);
        }
    };

    fetchData();

    console.log(supabase);

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <View style={styles.containerInputText}>
                <Logo style={styles.logo} height={34} width={35} />
            </View>
            <Text>Hello Yoshi</Text>
        </View>
    );
}

export default TestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 48,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 48,
    },
    containerInputText: {
        alignItems: 'center',
        width: '100%',
        gap: 40,
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
        width: '100%',
    },
});
