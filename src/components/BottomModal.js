import { View, Text, StyleSheet, Animated } from 'react-native'
import React from 'react'
import CustomButtons from './CustomButtons'
import { Colors } from '../constants/Colors'

export default function BottomModal() {
    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContentContainer}>
                <Text style={styles.title}>Selecionar Mensajero</Text>
                <View style={styles.rowBetween}>
                    <CustomButtons title={"Asignar"} onPress={null} />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({


    modalContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        zIndex: 1000,
        paddingHorizontal: 12,
    },
    title: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.primary,
    },
    modalContentContainer: {
        backgroundColor: '#ffffff',
        width: '100%',
        bottom: -25,
        height: 500,
        paddingHorizontal: 20,
        paddingVertical: 20,
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        shadowOffset: {
            height: 5,
            width: 1
        },
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
    rowBetween: {
        width: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }

})