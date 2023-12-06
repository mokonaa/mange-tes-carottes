import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { React, useState, useEffect } from 'react';
import Logo from '../assets/logo.svg'
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import FlatButton from '../components/FlatButton';

SplashScreen.preventAutoHideAsync();
function HomeScreen({ navigation }) {
    const [isComponentVisible, setIsComponentVisible] = useState(true);
    useEffect(() => {
        const handleScreenResize = () => {
            const { width } = Dimensions.get('window');
            const thresholdWidth = 375;

            setIsComponentVisible(width > thresholdWidth);
        };

        Dimensions.addEventListener('change', handleScreenResize);
        handleScreenResize();

        return () => {
            Dimensions.removeEventListener('change', handleScreenResize);
        };
    }, [])
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

    return (
        <SafeAreaView style={styles.wholeContainer}>
            <View style={styles.container} onLayout={onLayoutRootView}>
                {isComponentVisible && (
                    <Image style={styles.image} source={require('../assets/img/homepage_image.jpg')} />
                )}
                <View style={styles.containerText}>
                    <Logo style={styles.logo} height={45} width={216} />
                    <Text style={styles.title}>Une application pour suivre ton alimentation</Text>
                </View>
                <View style={styles.containerButtons}>
                    <FlatButton textValue="Créer un compte" onPress={() => navigation.navigate('CreerStep1')} backgroundColor="#2A843D" colorText="#fff" />
                    <FlatButton textValue="Se connecter" onPress={() => navigation.navigate('Connecter')} backgroundColor="#E8E8E8" colorText="#000" />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    wholeContainer: {
        height: '100%',
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
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