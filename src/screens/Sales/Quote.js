import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'

import { restoreToken } from '../../features/auth/auth'
import CustomFormartDate from '../../components/CustomFormartDate'
import { globalStyles } from '../../styles/global'

import SearchAny from '../../components/SearchAny'

export default function Quote({navigation}) {
  const [salesData, setSalesData] = useState([]);
  const [ids, setIds] = useState(new Set());
  const [loadingData, setLoadingData] = useState(false);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tokenID, setTokenID] = useState(null);
  const [searchSelected, setSearchSelected] = useState(null);

  const dispatch = useDispatch()
  useEffect(() => {
    getValueFor('uToken')
  }, [])

  useEffect(() => {
    setLoading(true);
    getValueFor('uToken')
  }, [skip])


  const handleLoadMore = () =>{
      setSkip(skip + 1)
  }

  useEffect(() => {
    if(searchSelected){
  
      navigation.navigate('QuoteDetails',{orderID : searchSelected.ID})
    }

  },[searchSelected])

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
        setTokenID(result)
        fetch(`https://api.admcloud.net/api/Quotes?token=${result}&skip=${skip}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            const filteredData = result.data.filter(item => !ids.has(item.id));
            const newIds = new Set([...ids, ...filteredData.map(item => item.id)]);
            setSalesData([...salesData, ...filteredData]);
            setIds(newIds);
            
            setLoading(false);
            setLoadingData(true);

          })
          .catch(error => console.log('error', error));
      } else {
        dispatch(restoreToken(null))
        console.log('SalesOrders no data');
      }
    }
    catch (err) {
      console.error('any fail.', err);
    }
  }

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <ActivityIndicator
        size="large"
        style={{ marginBottom: 10 }}
      />
    );
  };

  const Item = ({ data }) => {
    const date = new Date(data.item.DocDate);
    const formattedDate = date.toLocaleDateString();
    let AuthorizationStatusDesc, labelContainer;
    
    if(data.item.AuthorizationStatusDesc === "Autorizada"){
      AuthorizationStatusDesc = globalStyles.authorizedLabel;
      labelContainer = globalStyles.authorizedLabelContainer;
    }else if(data.item.AuthorizationStatusDesc === "Pendiente"){
      AuthorizationStatusDesc = globalStyles.pendingLabel;
      labelContainer = globalStyles.pendingLabelContainer;
    }

    return(
      <TouchableOpacity style={globalStyles.touchList} onPress={() => navigation.navigate('QuoteDetails',{orderID : data.item.ID}) }>

       <View style={globalStyles.rowBetween}>
       {data.item.AuthorizationStatusDesc ?  
       <View style={labelContainer}>
          <Text style={AuthorizationStatusDesc}>Estatus: {data.item.AuthorizationStatusDesc}</Text>
       </View> : ""}
       <Text>Días {data.item.Days} </Text>
      </View>
      <View style={globalStyles.rowBetween}>
      <View >
       {data.item.DocumentTypeName ?  <Text>Prioridad: {data.item.PriorityDesc} / {data.item.DocumentTypeName}</Text> : ""}
       </View>
       <CustomFormartDate DocDate={data.item.DocDate}/>
       
</View>
      <View style={globalStyles.rowBetween}>
        <Text style={globalStyles.listTitleText}>{data.item.RelationshipName}</Text>
        {data.item.FiscalID ? <Text style={globalStyles.listContentText}>No.:{data.item.DocID}</Text> : ""}
        
      </View>
      
      <View style={globalStyles.rowBetween}>
        <Text style={globalStyles.listContentText}>{data.item.CurrencyID}$ {data.item.TotalAmount.toLocaleString()}</Text>
      </View>

      <View style={globalStyles.rowBetween}>
      {data.item.LocationName ?  <Text>{data.item.LocationName}</Text> : ""}
      </View> 
  
      
      
    </TouchableOpacity>  
    )};


  return (
    <>


      <SafeAreaView style={style.content}>
        <Text style={globalStyles.title}>Cotizaciones</Text>
        <SearchAny searchIn="Quotes" data={salesData} tokenID={tokenID} searchSelected={(value) => setSearchSelected(value)} /> 
        {loadingData ? 
        <>
        <FlatList
          data={salesData}
          renderItem={(item) => <Item data={item} />}
          keyExtractor={item => item.ID}
          onEndReached={()=> handleLoadMore()}
          onEndReachedThreshold={.5}
          ListFooterComponent={renderFooter}

        /></>: <View style={globalStyles.contentSkeleton}>
          <Skeleton width={"95%"} colorMode={'light'} height={710} />
          <Skeleton width={"95%"} colorMode={'light'} height={710} />
          <Skeleton width={"95%"} colorMode={'light'} height={710} />
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