import React, { useEffect, useState } from 'react'
import {
  View, 
  Text, 
  SafeAreaView, 
  FlatList,
  ScrollView,
} from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'

import { restoreToken } from '../../features/auth/auth'
import { globalStyles, salesResume } from '../../styles/global'
import CustomButtons from '../../components/CustomButtons'


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
        console.log('no data');
      }
    }
    catch (err) {
      console.error('any fail.', err);
    }
  }


  return (
    <SafeAreaView >
      <ScrollView >
        <View >
            <Text style={globalStyles.title}>Sales</Text>
        </View>
        <View style={salesResume.salesRerportcontent}>
        
          <View style={salesResume.constentList}>
            <Text style={salesResume.listTitleText}>Enero</Text>
            <Text style={salesResume.lisstTotals}>$RD {salesData.data?.P1.toLocaleString()}</Text>
          </View>
          <View style={salesResume.constentList}>
            <Text style={salesResume.listTitleText}>Febrero</Text>
            <Text style={salesResume.lisstTotals}>$RD {salesData.data?.P2.toLocaleString()}</Text>
          </View>
          <View style={salesResume.constentList}>
            <Text style={salesResume.listTitleText}>Marzo</Text>
            <Text style={salesResume.lisstTotals}>$RD {salesData.data?.P3.toLocaleString()}</Text>
          </View>
          <View style={salesResume.constentList}>
            <Text style={salesResume.listTitleText}>Abril</Text>
            <Text style={salesResume.lisstTotals}>$RD {salesData.data?.P4.toLocaleString()}</Text>
          </View>
          <View style={salesResume.constentList}>
            <Text style={salesResume.listTitleText}>Mayo</Text>
            <Text style={salesResume.lisstTotals}>$RD {salesData.data?.P5.toLocaleString()}</Text>
          </View>
          <View style={salesResume.constentList}>
            <Text style={salesResume.listTitleText}>Junio</Text>
            <Text style={salesResume.lisstTotals}>$RD {salesData.data?.P6.toLocaleString()}</Text>
          </View>
          <View style={salesResume.constentList}>
            <Text style={salesResume.listTitleText}>Julio</Text>
            <Text style={salesResume.lisstTotals}>$RD {salesData.data?.P7.toLocaleString()}</Text>
          </View>
          <View style={salesResume.constentList}>
            <Text style={salesResume.listTitleText}>Agosto</Text>
            <Text style={salesResume.lisstTotals}>$RD {salesData.data?.P8.toLocaleString()}</Text>
          </View>
          <View style={salesResume.constentList}>
            <Text style={salesResume.listTitleText}>Septiembre</Text>
            <Text style={salesResume.lisstTotals}>$RD {salesData.data?.P9.toLocaleString()}</Text>
          </View>
          <View style={salesResume.constentList}>
            <Text style={salesResume.listTitleText}>Octubre</Text>
            <Text style={salesResume.lisstTotals}>$RD {salesData.data?.P10.toLocaleString()}</Text>
          </View>
          <View style={salesResume.constentList}>
            <Text style={salesResume.listTitleText}>Noviembre</Text>
            <Text style={salesResume.lisstTotals}>$RD {salesData.data?.P11.toLocaleString()}</Text>
          </View>
          <View style={salesResume.constentList}>
            <Text style={salesResume.listTitleText}>Diciembre</Text>
            <Text style={salesResume.lisstTotals}>$RD {salesData.data?.P12.toLocaleString()}</Text>
          </View>
        </View>
        <View>
          <CustomButtons title='Ordenes' onPress={() => navigation.navigate('Order') } />
          <CustomButtons title='Reporte de Ventas' onPress={() => navigation.navigate('ViewsReport') } />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

