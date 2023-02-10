import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Linking, TouchableOpacity } from 'react-native'

import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';

import { restoreToken } from '../../features/auth/auth'
import { Colors } from '../../constants/Colors';

export default function CustomerDetail({ route }) {
  const customerID = route.params.customerID
  const [customerData, setCustomerData] = useState([]);
  const [loadingData, setLoadingData] = useState(null);
  const [mapStyle, setMapStyle] = useState([style.mapLink, 'Ver Google Map'])
  const dispatch = useDispatch()
  useEffect(() => {
    getValueFor('uToken', customerID)
  }, [])

  async function getValueFor(key, customerID) {
    try {

      let result = await SecureStore.getItemAsync(key);
      if (result !== null) {
        dispatch(restoreToken(key))
        var raw = "";

        var requestOptions = {
          method: 'GET',
          body: raw,
          redirect: 'follow'
        };

        fetch(`https://api.admcloud.net/api/Customers/${customerID}?token=${result}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            setCustomerData(result.data)
            setLoadingData(true)

          })
          .catch(error => console.log('error', error));
      } else {
        dispatch(restoreToken(null))
        console.log('no data');
      }
    }
    catch (err) {
      console.error('any fail.', err);
    }
  }

  const openMap = async (uri) => {
   
    try {
      const supported = await Linking.canOpenURL(uri);
      
      if (supported){
        setMapStyle([style.mapLink, 'Ver Google Map'])
        Linking.openURL(uri)
      
        }else{
          setMapStyle([style.mapLinkWarning, 'Link de Google Map no valido'])
         
        }
    } catch (error) {
      setMapStyle([style.mapLinkWarning, 'Link de Google Map no valido'])
      console.log(error);
    }
  }
  const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />

  return (
    <SafeAreaView style={style.content}>
      {loadingData ?
        <View>
          <Text style={style.title}>{customerData.ComercialName}</Text>

          <View style={style.cartContent}>

            {customerData.Phone1 ? <View style={style.cartItems}>
              <Text style={style.listTitle}>Teléfono</Text>
              <Text style={style.listTitleText}>{customerData.Phone1}</Text>
            </View> : ""}
            {customerData.Addresses[0]?.Contact ? <View style={style.cartItems}>
              <Text style={style.listTitle}>Contacto</Text>
              <Text style={style.listTitleText}>{customerData.Addresses[0]?.Contact}</Text>
            </View> : ""}

            {customerData.Addresses[0]?.Address1 ? <View style={style.cartItems}>
              <Text style={style.listTitle}>Dirección</Text>
              <Text style={style.listTitleText}>{customerData.Addresses[0]?.Address1}</Text>
            </View> : ""}

            <View style={style.cartItems}>
              <Text style={style.listTitle}>{customerData?.SalesRep?.FirstName} </Text>
              <Text style={style.listTitleText}>{customerData?.SalesRep?.LastName}</Text>
            </View>
            {customerData.Notes ? <View style={style.cartItems}>
              
              <TouchableOpacity onPress={() => openMap(customerData.Notes)} style={mapStyle[0]}>
                <Text style={style.mapLinkText}>{mapStyle[1]}</Text>
              </TouchableOpacity>
            </View> : ""}
          </View>
        </View> :
        <View style={style.contentSkeleton}>
        <Skeleton width={"100%"} colorMode={'ligth'} height={35} />
        <View style={style.cartContent}>
        <Spacer height={30}/>
          <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
          <Spacer height={5}/>
          <Skeleton width={"70%"} colorMode={'ligth'} height={15} />
          <Spacer height={10}/>
          <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
          <Spacer height={5}/>
          <Skeleton width={"50%"} colorMode={'ligth'} height={15} />
          <Spacer height={10}/>
          <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
          <Spacer height={5}/>
          <Skeleton width={"90%"} colorMode={'ligth'} height={15} />
          <Spacer height={10}/>
          <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
          <Spacer height={5}/>
          <Skeleton width={"70%"} colorMode={'ligth'} height={15} />
        </View>
      </View>
      }
    </SafeAreaView>
  )
}


const style = StyleSheet.create({
  content: {
    justifyContent: 'center',
    width: "100%",
  },
  cartContent: {
    paddingVertical: 16,
  },
  cartItems: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    backgroundColor: Colors.white,
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
    padding:8,
  },
  mapLinkWarning:{
    backgroundColor: Colors.red,
    borderRadius: 8,
    padding:8,
  },
  mapLinkText:{
    color: Colors.Blueligth,
    textAlign:'center',
  },
  contentSkeleton:{
    justifyContent: 'center',
    width: "100%",
    padding:15,
  }

})