import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity ,SafeAreaView, FlatList} from 'react-native'
import {Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import firebase from 'firebase/app';

import { Colors } from '../../constants/Colors'

const delivery = [
                    {
                        id: "sOjCHgyVh4WkD9AdiID6ref1Pl92",
                        name: 'mensajeroherrera01',
                        email:"mensajeroherrera01@gumitires.com"
                    },
                    {   
                        id: "rOJE1nSPJfXRAcJ2CufD6pV6AfD2",
                        name: 'mensajerovillajuana01',
                        email:"mensajerovillajuana01@gumitires.com"
                    },
                    {   
                        id: "RBRbi7aOYfeeS2AthlIsbeFDhUT2",
                        name: 'supervisionvillajuana',
                        email:"supervisionvillajuana@gumitires.com"
                    },
                ]

export default function AsingDelivery({navigation}) {

    const Item = ({ data }) => {
        console.log(data.item);
        return (<View>
                    <TouchableOpacity >
                        <Text>{data.item.name}</Text>
                        <Text>{data.item.email}</Text>
                    </TouchableOpacity>
                </View>)
    };

    return (
    <SafeAreaView style={styles.content}>
    <View style={styles.modalContainer}>
    <View style={styles.modalContentContainer}>
        <Text style={styles.title}>Selecionar Mensajero</Text>
        <View style={styles.rowBetween}>
            <FlatList 
                data={delivery}
                renderItem={(item) => <Item data={item} />}
            />
        </View>
        <View style={styles.rowBetween}>
           
            <TouchableOpacity style={styles.btnPrimaryStyle}>
            <MaterialIcons name="delivery-dining" size={24} style={styles.btnIconStyle} color="white" />
                <Text style={styles.btnTextStyle}>Asignar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecundaryStyle} onPress={() => navigation.navigate('Camera') }>
                <Ionicons name="camera-outline" size={24} style={styles.btnIconStyle} color="white" />
                <Text style={styles.btnTextStyle}>Capturar Documento</Text>
            </TouchableOpacity>
        </View>
    </View>
</View>
</SafeAreaView>
  )
}


const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        marginTop: 15,
        width: "100%",
      },
    btnTextStyle:{
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginHorizontal: 5,
        paddingTop: 5,
    },
    btnIconStyle:{

    },
    btnSecundaryStyle:{
        display: "flex",
        justifyContent: "center",
        alignContent:"center",
        backgroundColor: Colors.secundary,
        padding:12,
        borderRadius:8,
        width:"100%",
        marginVertical:10,
        flexDirection:"row",
        coloir:"#ffffff"
    },

    btnPrimaryStyle:{
        display: "flex",
        justifyContent: "center",
        alignContent:"center",
        backgroundColor: Colors.primary,
        padding:12,
        borderRadius:8,
        width:"100%",
        marginVertical:10,
        flexDirection:"row",
        coloir:"#ffffff"
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
        height: "100%",
        paddingHorizontal: 20,
        paddingVertical: 20,

    },
    rowBetween: {
        width: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }

})