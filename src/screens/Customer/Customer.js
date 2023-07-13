import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from "react-redux"

import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'
import { globalStyles } from '../../styles/global'
import { restoreToken } from '../../features/auth/auth'

import ListCustomers from '../../components/ListCustomers' 
import { useFetch } from '../../hooks/useFetch';

export default function Customer({ navigation }) {

  const dispatch = useDispatch()
  
  const [customerData, setCustomerData] = useState([])
  const [ids, setIds] = useState(new Set());
  const [loadingData, setLoadingData] = useState(null);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tokenID, setTokenID] = useState(null);
  const [searchCustomer, setSearchCustomer] = useState(null);
  
  useEffect(()=> { 
    getValueFor('uToken') 
    getTokenID()
  },[])

  const pushScroll = () =>{
    setSkip(skip + 1)
  }

  useEffect(()=> {
    if(searchCustomer){
    const searchCustomerByID = searchCustomer.ID
    setSearchCustomer(null);
    navigation.navigate('Cliente', { data : searchCustomerByID })
    }
  
   },[searchCustomer])

  useEffect(()=> { 
    getValueFor('uToken') 
    setLoading(true);
    
},[skip])



  async function getTokenID() {
    try {

        let result = await SecureStore.getItemAsync('uToken');
        if (result !== null) {
            setTokenID(result);
        }
    } catch (err) {
        console.error('getTokenID any fail.', err);
    }
}



  
  // const URL_DETAILED = `Customers`
  // const URL_PARAMETER = `&skip=${index}`
  // const {isLoading, error, page, responseJSON} = useFetch(URL_DETAILED,URL_PARAMETER, requestOptions)

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
        

        fetch(`https://api.admcloud.net/api/Customers?token=${result}&skip=${skip}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            
            const filteredData = result.data.filter(item => !ids.has(item.ID));
            const newIds = new Set([...ids, ...filteredData.map(item => item.ID)]);

            setCustomerData([...customerData, ...filteredData]);
            setIds(newIds);
            setLoading(false);
            setLoadingData(true)

          })
          .catch(error => console.log('error', error));
      } else {
        dispatch(restoreToken(null))
        console.log('Customer no data');
      }
    }
    catch (err) {
      console.error('any fail.', err);
    }
  }

 // const Item = ({ data }) => console.log("data===",data.item.ID)
  const Item = ({ data }) => (
    <TouchableOpacity style={globalStyles.touchList} onPress={() => navigation.navigate('Cliente', { data : data.item.ID })}>
      <Text style={globalStyles.listTitleText}>{data.item.Name}</Text>
      <Text style={globalStyles.listContentText}> {data.item.Phone1}</Text>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
        <ActivityIndicator animating size="large" />
    );
  };


  return (

    <SafeAreaView style={style.content}>

      <ListCustomers
                        value={searchCustomer}
                        onChange={(value) => setSearchCustomer(value)}
                        label={"Cliente"}
                        tokenID={tokenID}
                    />
 
      {!loadingData ? <View style={style.contentSkeleton}>
        <Skeleton width={"95%"} colorMode={'ligth'} height={310} />
      </View>: <FlatList
        data={customerData}
        renderItem={(item) => <Item data={item} />}
        keyExtractor={item => item.ID}
        onEndReached={pushScroll}
        onEndReachedThreshold={.5}
        ListFooterComponent={renderFooter}
      />
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