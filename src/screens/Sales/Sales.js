import React, { useEffect, useState } from 'react'
import {
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';

import { restoreToken } from '../../features/auth/auth'
import { globalStyles, salesResume } from '../../styles/global'
import CustomButtons from '../../components/CustomButtons'
import { Colors } from "../../constants/Colors";

export default function Sales({navigation}) {
  
  const [salesData, setSalesData] = useState([]);
  const [loadingData, setLoadingData] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    getValueFor('uToken')
  }, [])

  async function getValueFor(key) {
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

        fetch(`https://api.admcloud.net/api/Sales?token=${result}`, requestOptions)
          .then(response => response.json())
          .then(result => {

            setSalesData(result)
            setLoadingData(true)

          })
          .catch(error => console.log('error', error));
      } else {
        dispatch(restoreToken(null))
        console.log('Sales no data');
      }
    }
    catch (err) {
      console.error('any fail.', err);
    }
  }

 
  const Item = (data) => {
    
    if(!data.data){
      return ;
    }
    if(data.data[data.months] === 0){
      return;
    }

    const months = 
      {"P1" : "Enero" , "P2":"Febrero", "P3":"Marzo", "P4":"Abril", "P5":"Mayo", "P6":"Junio","P7":"Julio","P8":"Agosto","P9":"Septiembre","P10":"Octubre","P11":"Noviembre","P12":"Diciembre"}
    return (
      
        <View style={salesResume.constentList}>
          <Text style={salesResume.listTitleText}>{months[data.months]}</Text>
          <Text style={salesResume.lisstTotals}>$RD {data.data[data.months].toLocaleString()}</Text>
        </View>
    
    )
  }

  const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />
  return (
    <SafeAreaView >
      <ScrollView >
        {salesData ? 
            <View style={salesResume.salesRerportcontent}>
              <Item data={salesData?.data} months={"P1"}/>
              <Item data={salesData?.data} months={"P2"}/>
              <Item data={salesData?.data} months={"P3"}/>
              <Item data={salesData?.data} months={"P4"}/>
              <Item data={salesData?.data} months={"P5"}/>
              <Item data={salesData?.data} months={"P6"}/>
              <Item data={salesData?.data} months={"P7"}/>
              <Item data={salesData?.data} months={"P8"}/>
              <Item data={salesData?.data} months={"P9"}/>
              <Item data={salesData?.data} months={"P10"}/>
              <Item data={salesData?.data} months={"P11"}/>
              <Item data={salesData?.data} months={"P12"}/>
            </View>
        :
                <View style={globalStyles.contentSkeleton}>
                <Skeleton width={"100%"} colorMode={'ligth'} height={35} />
                <View style={globalStyles.cartContent}>
                    <View style={globalStyles.cartItems}>
                        <Spacer height={30} />
                        <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
                    </View>
                    <View style={globalStyles.cartItems}>
                        <Spacer height={5} />
                        <Skeleton width={"70%"} colorMode={'ligth'} height={15} />
                    </View>
                    <View style={globalStyles.cartItems}>
                        <Spacer height={10} />
                        <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
                    </View>
                    <View style={globalStyles.cartItems}>
                        <Spacer height={5} />
                        <Skeleton width={"50%"} colorMode={'ligth'} height={15} />
                    </View>
                    <View style={globalStyles.cartItems}>
                        <Spacer height={10} />
                        <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
                    </View>
                    <View style={globalStyles.cartItems}>
                        <Spacer height={5} />
                        <Skeleton width={"90%"} colorMode={'ligth'} height={15} />
                    </View>
                    <View style={globalStyles.cartItems}>
                        <Spacer height={10} />
                        <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
                    </View>
                    <View style={globalStyles.cartItems}>
                        <Spacer height={5} />
                        <Skeleton width={"70%"} colorMode={'ligth'} height={15} />
                    </View>
                </View>
                
            </View>
        }
        <View>
        <View style={salesResume.salesRerportcontent}>
          <CustomButtons title='Ordenes' onPress={() => navigation.navigate('Order') } />
          <CustomButtons title='Cotizaciones' onPress={() => navigation.navigate('Quotes') } />  
        </View>
          
          <CustomButtons title='Nueva Cotización' styleButton={'secudary'} onPress={() => navigation.navigate('CreateOrder') } />
          <CustomButtons title='Reporte de Ventas' onPress={() => navigation.navigate('ViewsReport') } />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const SalesStyle = StyleSheet.create({
  title:{
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
   
  },
  titleContent:{
    marginBottom:25,
  }
})
