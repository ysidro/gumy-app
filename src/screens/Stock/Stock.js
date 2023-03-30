import React,{useEffect,useState} from 'react'
import { View, Text,FlatList,SafeAreaView,StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';

import { restoreToken } from '../../features/auth/auth'
import { globalStyles } from '../../styles/global'

export default function Stock() {
  const [stockData,setStockData] = useState([]);
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
      
        fetch(`https://api.admcloud.net/api/Stock?token=${result}&skip=0`, requestOptions)
        .then(response => response.json())
        .then(result => {
              setStockData(result.data)
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
  const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />
  const Item = ({data}) => (
    <View style={globalStyles.touchList}>
      <Text style={globalStyles.listTitleText}>{data.item.Name}</Text>
      <View style={globalStyles.rowBetween}>
        <View style={globalStyles.row5}>
          <Text style={globalStyles.lisLabel}>{data.item.SKU}</Text>
        </View>
        <View style={globalStyles.row5}>
          <Text style={globalStyles.listContentText}>{data.item.Stock} </Text>
        </View>
      </View>
      <View style={globalStyles.row}>
        <Text style={globalStyles.subTitle}>$ {data.item.TotalCost} </Text>
      </View>
    </View>
  );

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
    
    { loadingData ? <FlatList
        data={stockData}
        renderItem={(item) => <Item data={item} />}
        keyExtractor={item => item.ID}
      
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