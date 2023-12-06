import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import Logo from '../assets/logo-solo.svg';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import ContainerTextSide from '../components/ContainerTextSide';
import supabase from '../config/supabaseClient';

SplashScreen.preventAutoHideAsync();

function SuccessSignIn({ navigation, route }) {
    const [userData, setUserData] = useState([]);
    const userEmail = route.params?.userEmail;
    // const fetchData = async (userEmail) => {
    //     try {
    //         const { data, error } = await supabase
    //             .from('utilisateurs')
    //             .select('pseudo', 'prenom', 'consommation_viande')
    //             .eq('email'); 
    //         if (error) {
    //             console.error('Error fetching data:', error.message);
    //             return;
    //         }

    //         setUserData(data);
    //         console.log("data : " + userData);
    //     } catch (error) {
    //         console.error('Unexpected error:', error.message);
    //     }
    // };
    useEffect(() => {
        
    }, []);


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
                        textValue="Lorem Ipsum"
                        titleValue="Lorem Ipsum"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SuccessSignIn;

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
