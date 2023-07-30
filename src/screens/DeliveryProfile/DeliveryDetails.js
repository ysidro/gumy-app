import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, } from 'react-native'

import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';

import { restoreToken } from '../../features/auth/auth'
import { Colors } from '../../constants/Colors';
import CustomFormartDate from '../../components/CustomFormartDate'
import { globalStyles,salesResume } from '../../styles/global'

export default function DeliveryDetails({ route, navigation }) {

    const deliveryID = route.params.deliveryID
    const locationID = route.params.locationID
    const [customerData, setCustomerData] = useState([]);
    const [loadingData, setLoadingData] = useState(null);

   
    const dispatch = useDispatch()

    useEffect(() => {
      getValueFor('uToken', deliveryID)
    
    }, [])
  
    async function getValueFor(key, deliveryID) {
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
  
          fetch(`https://api.admcloud.net/api/Dispatchs/${deliveryID}?token=${result}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                
              setCustomerData(result.data)
              setLoadingData(true)


              
  
            })
            .catch(error => console.log('error', error));
        } else {
          dispatch(restoreToken(null))
          console.log('delivery details no data');
        }
      }
      catch (err) {
        console.error('delivery any fail.', err);
      }
    }

    const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />
    console.log(customerData)
  return (
    <SafeAreaView style={style.content}>
      {loadingData ?
        <ScrollView>
        <View style={style.cartContent}>
        <View style={style.cartItems}>
            <View ><Text>{customerData.PriorityDesc}</Text></View>
            <View style={globalStyles.rowBetween}>
                <Text style={globalStyles.listTitleText}>{customerData.DocID}</Text>
                <CustomFormartDate style={salesResume.listSubTitleText} DocDate={customerData.DocDate}/>
            </View>
            <View style={globalStyles.rowBetween}>
            <Text style={globalStyles.subTitle}>{customerData.RelationshipName}</Text>
            </View>
            <View style={globalStyles.rowBetween}>
                
                <Text style={globalStyles.lisLabel}>{customerData.LineBasedAuthorizationStatusDesc}</Text>
                <Text style={globalStyles.lisLabel}>{customerData.BillingStatusDesc}</Text>
            </View>
           </View>
        </View>
        { customerData.InternalNotes ? <View style={style.cartContent}>
            <View style={style.cartItems}>
                <Text>{customerData.InternalNotes}</Text>
            </View>
        </View> : ""}
        <View style={style.cartContent}>
            
            <View >
                <View style={style.cartItems}>
                <Text style={globalStyles.subTitle}>Desglose pedido</Text></View>
            { 
                customerData.Items.map((v,i) => (
                    <View key={i} style={style.cartItems}>
                        <View style={globalStyles.rowBetween}>
                            <Text style={globalStyles.lisLabel}>{v.ItemSKU}</Text>
                            <Text style={globalStyles.lisLabel}>{v.AuthorizationStatusDesc}</Text>
                        </View>
                        <Text style={globalStyles.subTitle}>{v.Name}</Text>
                        <View style={globalStyles.rowBetween}>
                            <View style={globalStyles.row5}>
                                <Text>{v.UOMName}</Text>
                                <Text> {v.Quantity}</Text>
                            </View>
                            <Text>${v.Cost}</Text>
                        </View>
                    </View>
                ))
            }
            </View>
        
        </View>
        </ScrollView>
        
        :
        <View style={style.contentSkeleton}>
        <Skeleton width={"100%"} colorMode={'ligth'} height={35} />
        <View style={style.cartContent}>
          <View style={style.cartItems}>
            <Spacer height={30}/>
            <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
          </View>
          <View style={style.cartItems}>
            <Spacer height={5}/>
            <Skeleton width={"70%"} colorMode={'ligth'} height={15} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={10}/>
            <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={5}/>
            <Skeleton width={"50%"} colorMode={'ligth'} height={15} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={10}/>
            <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={5}/>
            <Skeleton width={"90%"} colorMode={'ligth'} height={15} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={10}/>
            <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={5}/>
            <Skeleton width={"70%"} colorMode={'ligth'} height={15} />
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
    }
  
  })