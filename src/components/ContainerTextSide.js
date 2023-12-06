import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const ContainerTextSide = ({ titleValue, textValue }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{titleValue}</Text>
            <Text style={styles.body}>{textValue}</Text>
        </View>
    )
}

export default ContainerTextSide

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontFamily: 'Nunito-ExtraBold',
        color: '#000',
        fontSize: 32,
        textAlign: 'center',
    },
    body: {
        fontSize: 14,
        fontFamily: 'Nunito-Medium',
        color: '#696969',
        flexWrap: 'wrap',
        textAlign: 'center',
    }
});