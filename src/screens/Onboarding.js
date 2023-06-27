import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../constants/Colors'
import Constants from "expo-constants"
import * as Notifications from "expo-notifications"
import * as Device from "expo-device"
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Onboarding() {
    const navigator = useNavigation();
    function handlePress() {
        registerForPushNotificationsAsync().then(async token => {
            await AsyncStorage.setItem('@pushNotificationToken', token)
            console.log('Push notification true',token)
            navigator.navigate('Home')
        }).catch(error => {
            console.error("error", error)
            navigator.navigate('Home')
        })
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }


        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('fail to get token');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            
            

        } else {
            return;
        }

        return token;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a Gummy</Text>
            <View style={styles.featureContainer}>
                <MaterialCommunityIcons name="check-all" size={42} color={Colors.primary} />
                <View style={{ flex: 1, marginLeft: 16 }}>
                    <Text style={styles.subTitle}>Manegar Tareas Diarias</Text>
                    <Text style={styles.subHeadLine}>Esta app te noficará cuando pasen cosas importantes dentro del sistema.</Text>
                </View>
            </View>

            <View style={styles.featureContainer}>
                <MaterialCommunityIcons name="bell-badge-outline" size={42} color={Colors.primary} />
                <View style={{ flex: 1, marginLeft: 16 }}>
                    <Text style={styles.subTitle}>Notifícaciones</Text>
                    <Text style={styles.subHeadLine}>Favor activa las notificaciones para estar siempre informado de cuando pasa algo importante dentro del sistema.</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>

        </View>
    )
}

const iphoneHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: Colors.ligth,
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: iphoneHeight > 800 ? 20 : 50,
        color: Colors.secundary,
    },
    subTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 22,
        color: Colors.secundary,
    },
    subHeadLine: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
        color: Colors.black,
    },
    featureContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: 20,
        marginBottom: 30,
        width: "100%",
    },

    button: {
        width: Dimensions.get('window').width - '60',
        height: 45,
        backgroundColor: Colors.primary,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonNull: {
        width: Dimensions.get('window').width - '20',
        height: 45,
        backgroundColor: "#c7ecee",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.ligth,
        fontSize: 16,
        fontWeight: 'bold',
    },


})