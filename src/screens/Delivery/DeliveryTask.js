import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView,TouchableOpacity} from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { Colors } from '../../constants/Colors';
import { globalStyles, salesResume } from '../../styles/global'
export default function DeliveryTask({ route, navigation }) {
  console.log(route.params)
  return (
    <SafeAreaView style={style.content}>
      <ScrollView>
      <View style={style.cartContent}>
      <Text>DeliveriTask</Text>
      </View>
      </ScrollView>
      <TouchableOpacity style={style.btnSecundaryStyle} onPress={() => navigation.navigate('Camera')}>
                            <Ionicons name="camera-outline" size={24}  color="white" />
                            <Text style={style.btnTextStyle}>Capturar Documento</Text>
                        </TouchableOpacity>
    </SafeAreaView>
  )
}


const style = StyleSheet.create({
  content: {
    justifyContent: 'center',
    width: "100%",
  },
  cartContent: {
    paddingVertical: 18,
    margin:8,
    backgroundColor: Colors.white,
    borderRadius:12,
  },
  cartItems: {
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 15,
    marginBottom: 0,
    marginHorizontal: 10,
    color: Colors.primary,
  },
  listTitle: {
    fontWeight: "bold",
    fontSize: 12,
    color: Colors.grey,
  },
  listTitleText: {
    color: Colors.secundary,
    fontSize: 18,
    fontWeight: "bold",
  },
  mapLink:{
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding:16,
  },
  mapLinkWarning:{
    backgroundColor: Colors.red,
    borderRadius: 8,
    padding:16,
  },
  mapLinkText:{
    color: Colors.Blueligth,
    textAlign:'center',
    fontWeight: 'bold',
  },
  regularButton:{
    backgroundColor: Colors.secundary,
    borderRadius: 8,
    padding:14,
  },
  contentSkeleton:{
    justifyContent: 'center',
    width: "100%",
    padding:16,
  },

  btnSecundaryStyle: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: Colors.secundary,
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
  },
  btnTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: 5,
    paddingTop: 5,
},
btnIconStyle: {

}
})