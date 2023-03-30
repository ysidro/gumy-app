import React, {useState,useReducer, useEffect} from 'react'
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native'

import { Skeleton } from 'moti/skeleton'
import { globalStyles } from '../../styles/global'


import { useFetch } from '../../hooks/useFetch';

export default function Customer({ navigation }) {

  const [index, setIndex] = useState(0)
  const [data, setData] = useState([]);

  let raw = "";
  var requestOptions = {
    method: 'GET',
    body: raw,
    redirect: 'follow'
  };

  const URL_DETAILED = `Customers`
  const URL_PARAMETER = `&skip=${index}`
  const {isLoading, error, page, responseJSON} = useFetch(URL_DETAILED,URL_PARAMETER, requestOptions)

  useEffect(() => {
    setData(responseJSON)
  },[isLoading])

  const pushCustomer = () =>{
    // const sumIndex = index + 1;
    // setIndex(sumIndex)
    // alert(`index es igual a ${index}`)

  }

  console.log(isLoading)
   const Item = ({ data }) => (
    
    <TouchableOpacity style={globalStyles.touchList} onPress={() => navigation.navigate('Cliente', { data : data.item.ID })}>
      <Text style={globalStyles.listTitleText}>{data.item.Name}</Text>
      <Text style={globalStyles.listContentText}> {data.item.Phone1}</Text>
    </TouchableOpacity>
  );

 

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  return (

    <SafeAreaView style={style.content}>

      {isLoading ? <View style={style.contentSkeleton}>
        <Skeleton width={"95%"} colorMode={'ligth'} height={310} />
      </View>: <FlatList
        data={responseJSON.data}
        renderItem={(item) => <Item data={item} />}
        keyExtractor={item => item.ID}
        onEndReached={pushCustomer}
        onEndReachedThreshold={.5}
        refreshing={isLoading}
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