import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'

import { restoreToken } from '../../features/auth/auth'
import CustomFormartDate from '../../components/CustomFormartDate'
import { globalStyles } from '../../styles/global'

export default function Order() {
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

        fetch(`https://api.admcloud.net/api/SalesOrders?token=${result}&skip=0`, requestOptions)
          .then(response => response.json())
          .then(result => {
            setSalesData(result.data)
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

 

  const Item = ({ data }) => {
    const date = new Date(data.item.DocDate);
    const formattedDate = date.toLocaleDateString();
    return(
    <View style={globalStyles.touchList}>
       <View style={globalStyles.rowBetween}>
        <Text style={globalStyles.listContentText}>{data.item.RelationshipName}</Text>
      </View>
      
      <View style={globalStyles.rowBetween}>
        <Text style={globalStyles.listTitleText}>${data.item.CurrencyID} {data.item.TotalAmount.toLocaleString()}</Text>
        <CustomFormartDate DocDate={data.item.DocDate}/>
      </View>

      <View style={globalStyles.rowBetween}>
       {data.item.EmployeeName ?  <Text>{data.item.EmployeeName}</Text> : ""}
       {data.item.DispatchStatusDesc ?  <Text>{data.item.DispatchStatusDesc}</Text> : ""}
      </View> 
      
      
    </View>
  )};


  return (
    <>


      <SafeAreaView style={style.content}>

        {loadingData ? <FlatList
          data={salesData}
          renderItem={(item) => <Item data={item} />}
          keyExtractor={item => item.ID}

        /> : <View style={globalStyles.contentSkeleton}>
          <Skeleton width={"95%"} colorMode={'ligth'} height={310} />
        </View>
        }
      </SafeAreaView>
    </>
  )
}

const style = StyleSheet.create({
  content: {
    justifyContent: 'center',
    marginTop: 15,
    width: "100%",
  },

})