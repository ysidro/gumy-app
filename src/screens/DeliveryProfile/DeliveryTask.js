import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView,TouchableOpacity} from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { Colors } from '../../constants/Colors';
import { globalStyles, salesResume } from '../../styles/global'
export default function DeliveryTask({ route, navigation }) {
  const taskItem = route.params.task;
  const items = route.params.items;

  return (
    <SafeAreaView style={styles.content}>
      <ScrollView>
        <View style={styles.cartContent}>
          <View style={styles.cartItems}>
          <Text style={styles.listTitleText}>{taskItem.BillingStatusDesc}</Text>
          <Text style={styles.listTitleText}>{taskItem.StatusDesc}</Text>
          <Text style={styles.listTitle}>Documento: {taskItem.DocID}</Text>
          <Text style={styles.listTitle}>Prioridad:{taskItem.InternalPriorityDesc}</Text>
          <Text style={styles.title}>{taskItem.RelationshipName}</Text>
          </View>
        </View>
        <View >
                <View style={styles.cartItems}>
                <Text style={globalStyles.subTitle}>Desglose pedido</Text></View>
            { 
                items.map((v,i) => (
                    <View key={i} style={styles.cartItems}>
                        <View style={globalStyles.rowBetween}>
                            <Text style={globalStyles.lisLabel}>{v.ItemSKU}</Text>
                            <Text style={globalStyles.lisLabel}>{v.AuthorizationStatusDesc}</Text>
                        </View>
                        <Text style={globalStyles.subTitle}>{v.Name}</Text>
                        <View style={globalStyles.rowBetween}>
                            
                                <Text>Cantidad: {v.Quantity} {v.UOMName}/s </Text>
                              
                                <Text>${v.Cost}</Text>
                           
                            
                        </View>
                    </View>
                ))
            }
            </View>
            <View style={styles.cartItems}>
              <TouchableOpacity style={styles.btnSecundaryStyle} onPress={() => navigation.navigate('Camera')}>
                <Ionicons name="camera-outline" size={24}  color="white" />
                <Text style={styles.btnTextStyle}>Capturar Documento</Text>
              </TouchableOpacity>
            </View>
      </ScrollView>
      
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    width: "100%",
  },
  cartContent: {
    paddingVertical: 18,
    margin:8,
    backgroundColor: Colors.white,
    color:Colors.black,
    borderRadius:12,
  },
  cartItems: {
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 10,
    color:"#000",
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