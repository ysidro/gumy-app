import React, {  useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Linking, TouchableOpacity } from 'react-native'

import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';

import { useFetch } from '../../hooks/useFetch';
import { Colors } from '../../constants/Colors';

export default function CustomerDetail({ route,navigation }) {

  const [mapStyle, setMapStyle] = useState([style.mapLink, 'Ver Google Map'])

  let raw = "";
  var requestOptions = {
    method: 'GET',
    body: raw,
    redirect: 'follow'
  };

  const URL_DETAILED = `Customers/${route.params.data}`
  const {isLoading, error, responseJSON} = useFetch(URL_DETAILED,'', requestOptions)
 

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
      {!isLoading ?
        <View>
          <Text style={style.title}>{responseJSON.data.ComercialName}</Text>

          <View style={style.cartContent}>

            {responseJSON.data.Phone1 ? <View style={style.cartItems}>
              <Text style={style.listTitle}>Teléfono</Text>
              <Text style={style.listTitleText}>{responseJSON.data.Phone1}</Text>
            </View> : ""}

            {responseJSON.data.Addresses[0]?.Contact ? <View style={style.cartItems}>
              <Text style={style.listTitle}>Contacto</Text>
              <Text style={style.listTitleText}>{responseJSON.data.Addresses[0]?.Contact}</Text>
            </View> : ""}

            {responseJSON.data.Addresses[0]?.Address1 ? <View style={style.cartItems}>
              <Text style={style.listTitle}>Dirección</Text>
              <Text style={style.listTitleText}>{responseJSON.data.Addresses[0]?.Address1}</Text>
            </View> : ""}

            <View style={style.cartItems}>
              <Text style={style.listTitle}>{responseJSON.data?.SalesRep?.FirstName} </Text>
              <Text style={style.listTitleText}>{responseJSON.data?.SalesRep?.LastName}</Text>
            </View>

            {responseJSON.data.Notes ? <View style={style.cartItems}>
              
              <TouchableOpacity onPress={() => openMap(responseJSON.data.Notes)} style={mapStyle[0]}>
                <Text style={style.mapLinkText}>{mapStyle[1]}</Text>
              </TouchableOpacity>
            </View> : ""}
            <View style={style.cartItems}>
              <TouchableOpacity onPress={() => navigation.navigate('HistoricoCompras',{customerID : responseJSON.data.ID}) } style={style.regularButton}>
                <Text style={style.mapLinkText} >Historico de Compras</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> :
        <View style={style.contentSkeleton}>
        <Skeleton width={"100%"} colorMode={'light'} height={35} />
        <View style={style.cartContent}>
          <View style={style.cartItems}>
            <Spacer height={30}/>
            <Skeleton width={"20%"} colorMode={'light'} height={10} />
          </View>
          <View style={style.cartItems}>
            <Spacer height={5}/>
            <Skeleton width={"70%"} colorMode={'light'} height={15} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={10}/>
            <Skeleton width={"20%"} colorMode={'light'} height={10} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={5}/>
            <Skeleton width={"50%"} colorMode={'light'} height={15} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={10}/>
            <Skeleton width={"20%"} colorMode={'light'} height={10} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={5}/>
            <Skeleton width={"90%"} colorMode={'light'} height={15} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={10}/>
            <Skeleton width={"20%"} colorMode={'light'} height={10} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={5}/>
            <Skeleton width={"70%"} colorMode={'light'} height={15} />
          </View>
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
    color: Colors.secondary,
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
    color: Colors.Bluelight,
    textAlign:'center',
    fontWeight: 'bold',
  },
  regularButton:{
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    padding:14,
  },
  contentSkeleton:{
    justifyContent: 'center',
    width: "100%",
    padding:16,
  }

})