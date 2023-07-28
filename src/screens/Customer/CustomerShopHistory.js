import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Linking, TouchableOpacity,FlatList } from 'react-native'

import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';


import { restoreToken } from '../../features/auth/auth'
import { Colors } from '../../constants/Colors';
import { globalStyles } from '../../styles/global'
import { useFetch } from '../../hooks/useFetch';

export default function CustomerShopHistory({route}) {

    const customerID = route.params.customerID
    let raw = "";
    var requestOptions = {
      method: 'GET',
      body: raw,
      redirect: 'follow'
    };
  
    const URL_DETAILED = `Sales/SalesByItemDetailed/`
    const URL_PARAMETER = `customerID=${customerID}`
    const {isLoading, error, responseJSON} = useFetch(URL_DETAILED,URL_PARAMETER, requestOptions)


     const Item = ({data}) => (
        <View style={globalStyles.touchList}>
        <View style={globalStyles.rowBetween}>
        <Text style={globalStyles.lisLabel}> {data.item.DocumentTypeName}</Text>
        <Text style={globalStyles.lisLabel}>{data.item.DocID}</Text>
        </View>
        <View style={globalStyles.raw}>
            <Text style={globalStyles.listContentText}> {data.item.ItemName}</Text>
            <Text style={globalStyles.listContentText}> {data.item.CurrencyID} {data.item.NetAmountLocal}</Text>
        </View>
        <View style={globalStyles.rowBetween}>
          
         
        
          <Text style={globalStyles.lisLabel}> SKU {data.item.SKU}</Text>
          <Text style={globalStyles.lisLabel}>{data.item.DocDate}</Text>
      
        </View>
        <View style={globalStyles.row}>
          
        </View>
      </View>
  );

  const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />
  const SkeletonLoda = () =>(
    <View style={style.contentSkeleton}> 
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'ligth'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'ligth'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'ligth'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'ligth'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'ligth'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'ligth'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'ligth'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'ligth'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'ligth'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'ligth'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'ligth'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'ligth'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'ligth'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'ligth'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'ligth'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'ligth'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'ligth'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'ligth'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'ligth'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'ligth'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'ligth'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'ligth'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'ligth'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'ligth'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'ligth'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'ligth'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'ligth'}  height={15} /> 
      </View>
    </View> 
  )

  return (
    <SafeAreaView style={style.content}>
    
    { !isLoading ? <FlatList
        data={responseJSON.data}
        renderItem={(item) => <Item data={item} />}
        keyExtractor={item => item.ID }
      
      /> :  <SkeletonLoda/> 
      }

      
  </SafeAreaView>
  )
}

const style = StyleSheet.create({
  content:{
      justifyContent: 'center',
      marginTop:15,
      width:"100%",
  },
  
})