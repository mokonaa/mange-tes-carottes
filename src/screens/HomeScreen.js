import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react';
import Logo from '../assets/logo.svg'
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import FlatButton from '../components/FlatButton';

SplashScreen.preventAutoHideAsync();
function HomeScreen() {
    const [fontsLoaded] = useFonts({
        'Nunito-ExtraBold': require('../assets/fonts/Nunito-ExtraBold.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    if (!fontsLoaded) {
        return null;
    }

    const handlePress = () => {
        // Your button press logic here
        console.log('Button pressed!');
    };
    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Image style={styles.image} source={require('../assets/img/homepage_image.jpg')} />
            <View style={styles.containerText}>
                <Logo style={styles.logo} height={45} width={216} />
                <Text style={styles.title}>Une application qui t’aide à suivre ton alimentation</Text>
            </View>
            <View style={styles.containerButtons}>
                <FlatButton textValue="Créer un compte" onPress={handlePress} backgroundColor="#2A843D" colorText="#fff" />
                <FlatButton textValue="S'inscrire" onPress={handlePress} backgroundColor="#E8E8E8" colorText="#000" />
            </View>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 48,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 48,
    },
    image: {
        width: '100%',
        height: 300,
    },
    logo: {
        width: '100%',
    },
    containerButtons: {
        gap: 16,
        width: '100%'
    },
    containerText: {
        gap: 8,
        width: '100%',
    },
    title: {
        fontFamily: 'Nunito-ExtraBold',
        fontSize: 40,
    }
});