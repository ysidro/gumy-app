import React,{useEffect,useState} from 'react'
import { View, Text,FlatList,SafeAreaView,StyleSheet } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'

import { restoreToken } from '../../features/auth/auth'
import { globalStyles,salesResume } from '../../styles/global'
import CustomFormartDate from '../../components/CustomFormartDate'

export default function ViewsReport() {
  const [salesData,setSalesData] = useState([]);
  const [loadingData,setLoadingData] = useState(null);
  const dispatch = useDispatch()
  useEffect(() =>{
      getValueFor('uToken')
  },[])

  async function getValueFor(key) {
    try{
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
        
            // const groupedData = Object.values(result.data.reduce((acc, curr) => {
            //     if (!acc[curr.SalesRepName]) {
            //       acc[curr.SalesRepName] = { id: curr.NCF, SalesRepName: curr.SalesRepName, value: 0 };
            //     }
            //     acc[curr.SalesRepName].value += curr.TotalAmount;
            //     return acc;
            //   }, {}));
            
              setSalesData(result.data)
              setLoadingData(true)
             
        })
        .catch(error => console.log('error', error));
    } else {
      dispatch(restoreToken(null))
      console.log('no data');
    }
    }
    catch(err){
      console.error('any fail.', err);
    }
  }

  const Item = ({data}) => (
    <View style={globalStyles.touchList}>
      <Text style={globalStyles.listContentText}>{data.item.RelationshipName}</Text>
      <Text style={salesResume.listSubTitleText}>{data.item.SalesRepName}</Text>
      <View style={globalStyles.rowBetween}>
        <Text >{data.item.DocumentTypeName}</Text>
        <Text >${data.item.TotalAmount.toLocaleString()} {data.item.CurrencyID}</Text>
        <CustomFormartDate style={salesResume.listSubTitleText} DocDate={data.item.DocDate}/>
      </View>
    </View>
  );


  return (
    <>
    <View >
       <Text style={globalStyles.title}>Resporte de ventas</Text>
    </View>

  <SafeAreaView style={style.content}>
    
    { loadingData ? <FlatList
        data={salesData}
        renderItem={(item) => <Item data={item} />}
        keyExtractor={item => item.ID}
      
      /> :  <View style={globalStyles.contentSkeleton}> 
              <Skeleton width={"95%"} colorMode={'ligth'}  height={310} /> 
            </View> 
      }

      
  </SafeAreaView>
</>
  )
}

const style = StyleSheet.create({
  content:{
      justifyContent: 'center',
      marginTop:15,
      width:"100%",
  },
})