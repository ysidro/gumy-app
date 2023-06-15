import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'

import { restoreToken } from '../../features/auth/auth'
import { globalStyles } from '../../styles/global'
import CustomFormartDate from '../../components/CustomFormartDate'
export default function SaleReport() {
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

        fetch(`https://api.admcloud.net/api/Sales/Detailed?token=${result}&year=2023&month=1`, requestOptions)
          .then(response => response.json())
          .then(result => {

            setSalesData(result.data)
            setLoadingData(true)

          })
          .catch(error => console.log('error', error));
      } else {
        dispatch(restoreToken(null))
        console.log('Detailed  salres report no data');
      }
    }
    catch (err) {
      console.error('any fail.', err);
    }
  }

  const Item = ({ data }) => (
    <View style={style.constentList}>
      <Text style={style.listTitleText}>{data.item.RelationshipName}</Text>
      <Text >{data.item.SalesRepName}</Text>
      <CustomFormartDate  DocDate={data.item.DocDate}/>
      <Text style={style.lisstTotals}>${data.item.TotalAmount.toLocaleString()}</Text>
    </View>
  );


  return (
    <>
      <View >
        <Text style={globalStyles.title}>Sales</Text>
      </View>
      <SafeAreaView style={style.content}>
        {loadingData ? <FlatList
          data={salesData}
          renderItem={(item) => <Item data={item} />}
          keyExtractor={item => item.ID}

        /> : <View style={style.contentSkeleton}>
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
  contentSkeleton: {
    width: "100%",
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  constentList: {
    paddingTop: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    width: "100%",
  },
  listTitle: {
    fontWeight: "bold",
    fontSize: 26,
    margin: 10,
  },
  listTitleText: {

  },
  lisstTotals: {
    fontWeight: "bold",
    fontSize: 18,

  },
})