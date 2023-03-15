import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'

import { restoreToken } from '../../features/auth/auth'
import { globalStyles } from '../../styles/global'

export default function Customer({ navigation }) {
  const [customerData, setCustomerData] = useState([]);
  const [customerPagination, setCustomerPagination] = useState(0);
  const [loadingData, setLoadingData] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {

    getValueFor('uToken')
  }, [])

  function loadMoreDate() {
    //setCustomerPagination(customerPagination + 1);
    getValueFor('uToken');
  }

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

        fetch(`https://api.admcloud.net/api/Customers?token=${result}&skip=${customerPagination}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            
            const newData = result.data.filter(item => !customerData.find(i => i.id === item.id));
   
            setCustomerData(prevItems => [...prevItems, ...newData]);
            setCustomerPagination(prevPage => prevPage + 1);
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

  const Item = ({ data }) => (
    <TouchableOpacity style={globalStyles.touchList} onPress={() => navigation.navigate('Cliente', { customerID: data.item.ID })}>
      <Text style={globalStyles.listTitleText}>{data.item.Name}</Text>
      <Text style={globalStyles.listContentText}>{data.item.Phone1}</Text>
    </TouchableOpacity>
  );


  return (

    <SafeAreaView style={style.content}>

      {loadingData ? <FlatList
        data={customerData}
        renderItem={(item) => <Item data={item} />}
        keyExtractor={item => item.ID}

        ListFooterComponent={<TouchableOpacity style={globalStyles.touchList} onPress={() => loadMoreDate()}><Text>Cargar más {customerPagination}</Text></TouchableOpacity>}

      /> : <View style={style.contentSkeleton}>
        <Skeleton width={"95%"} colorMode={'ligth'} height={310} />
      </View>
      }


    </SafeAreaView>

  )
}

const style = StyleSheet.create({
  content: {
    justifyContent: 'center',
    marginTop: 15,
    width: "100%",
  },

})