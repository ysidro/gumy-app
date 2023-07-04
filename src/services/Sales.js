import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native'

import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';

import { useFetch } from '../hooks/useFetch';
import { Colors } from '../constants/Colors'
import { globalStyles } from '../styles/global'
export default function ServicesSales() {


  let raw = "";
  var requestOptions = {
    method: 'GET',
    body: raw,
    redirect: 'follow'
  };

  const URL_DETAILED = `Sales/Detailed`
  const URL_PARAMETER = `year=2023`
  const {isLoading, error, responseJSON} = useFetch(URL_DETAILED,URL_PARAMETER, requestOptions)

  const Item = ({ data }) => (
    <View style={globalStyles.constentList}>
      <Text style={globalStyles.subTitle}>{data.item.SalesRepName}</Text>
      <Text style={globalStyles.lisstTotals}>${data.item.value.toLocaleString()}</Text>
    </View>
  );
  const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />
  return (
    <SafeAreaView style={style.content}>
      <Text style={globalStyles.listTitle}>Resumen de Ventas</Text>

      {!isLoading ? <FlatList
        data={Object.values(responseJSON.data.reduce((acc, curr) => {
          if (!acc[curr.SalesRepName]) {
            acc[curr.SalesRepName] = { id: curr.NCF, SalesRepName: curr.SalesRepName, value: 0 };
          }
          acc[curr.SalesRepName].value += curr.TotalAmount;
          return acc;
        }, {}))}
        renderItem={(item) => <Item data={item} /> }
        keyExtractor={item => item.id}

      /> : <View style={globalStyles.contentSkeleton}>
        <Skeleton backgroundColor={Colors.primary} highlightColor={Colors.secundary} width={"35%"} colorMode={'ligth'} height={20} />
        <Spacer height={10} />
        <Skeleton width={"25%"} colorMode={'ligth'} height={20} />
        <Spacer height={20} />
        <Skeleton backgroundColor={Colors.primary} highlightColor={Colors.secundary} width={"35%"} colorMode={'ligth'} height={20} />
        <Spacer height={10} />
        <Skeleton width={"25%"} colorMode={'ligth'} height={20} />
        <Spacer height={20} />
        <Skeleton backgroundColor={Colors.primary} highlightColor={Colors.secundary} width={"35%"} colorMode={'ligth'} height={20} />
        <Spacer height={10} />
        <Skeleton width={"25%"} colorMode={'ligth'} height={20} />
        <Spacer height={20} />
        <Skeleton backgroundColor={Colors.primary} highlightColor={Colors.secundary} width={"35%"} colorMode={'ligth'} height={20} />
        <Spacer height={10} />
        <Skeleton width={"25%"} colorMode={'ligth'} height={20} />
        <Spacer height={20} />
      </View>
      }
    </SafeAreaView>
  )
}


const style = StyleSheet.create({
  content: {

    backgroundColor: Colors.secundary,
    borderRadius: 12,
    borderColor: Colors.Blueligth,
    border: 5,
    justifyContent: 'center',
    marginTop: 15,
    width: "90%",
  },

})