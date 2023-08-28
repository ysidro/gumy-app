import * as React from 'react'
import Constants from "expo-constants";
import { View, Text, SafeAreaView, StyleSheet, Linking, TouchableOpacity } from 'react-native'

import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';

import { useFetch } from '../../hooks/useFetch';
import { Colors } from '../../constants/Colors';

export default function CustomerDetail({ route,navigation }) {
  const [isLoading, setIsLoading] =  React.useState(true);
  const [loadingData, setLoadingData] = React.useState(null);
  const [customerData, setCustomerData] = React.useState(null);
  const [mapStyle, setMapStyle] = React.useState([style.mapLink, 'Ver Google Map'])

  React.useEffect(() => {
    getValueFor()

}, [])

  async function getValueFor() {
    try {

        var requestOptions = {
            method: 'GET',
            body: "",
            redirect: 'follow'
        };


        fetch(`https://api.admcloud.net/api/Customers/${route.params.data}?token=${Constants.expoConfig.extra.AMD_TOKEN}`, requestOptions)
            .then(response => response.json())
            .then(result => {
              setCustomerData(result.data)
                // const filteredData = result.data.filter(item => !ids.has(item.ID));
                // const newIds = new Set([...ids, ...filteredData.map(item => item.ID)]);

                // setCustomerData([...customerData, ...filteredData]);
                // setIds(newIds);
                setIsLoading(false);
                setLoadingData(true)

            })
            .catch(error => console.log('error', error));

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
      {!isLoading ?
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
            <View style={style.cartItems}>
              <TouchableOpacity onPress={() => navigation.navigate('HistoricoCompras',{customerID : customerData.ID}) } style={style.regularButton}>
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