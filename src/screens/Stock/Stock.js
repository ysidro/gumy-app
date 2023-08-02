import React,{useEffect,useState} from 'react'
import { View, Text,FlatList,SafeAreaView,StyleSheet,  ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';

import { restoreToken } from '../../features/auth/auth'
import { globalStyles } from '../../styles/global'

export default function Stock() {
  const [stockData,setStockData] = useState([]);
  const [ids, setIds] = useState(new Set());
  const [loadingData, setLoadingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const dispatch = useDispatch()

  useEffect(() =>{
      getValueFor('uToken')
  },[])

  useEffect(()=> { 
    getValueFor('uToken') 
    setLoading(true);
    console.log(skip)
},[skip])

const pushScroll = () =>{
  setSkip(skip + 1)
}

// function filterByValue(array, string) {
//   return array.filter(o =>
//       Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
// }

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
      
        fetch(`https://api.admcloud.net/api/Items?OnlyActive=true&token=${result}&skip=${skip}`, requestOptions)
        .then(response => response.json())
        .then(result => {
              setStockData(result.data)
              setLoadingData(true)
        })
        .catch(error => console.log('error', error));
      } else {
        dispatch(restoreToken(null))
        console.log('no data Stock');
      }
    }
    catch(err){
      console.error('any fail.', err);
    }
  }
  const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />
  const Item = ({data}) => (
    <View style={globalStyles.touchList}>
      <Text style={globalStyles.lisLabel}>SKU: {data.item.SKU}</Text>
      <Text style={globalStyles.listTitleText}>{data.item.Name}</Text>
      <View style={globalStyles.rowBetween}>
        <View style={globalStyles.row5}>
        <Text style={globalStyles.listContentText}>Existencia: {data.item.StockItem ? "SI":"NO"} </Text>  
        </View>
      
      </View>
      <View style={globalStyles.row}>
        <Text style={globalStyles.subTitle}>RD$ {data.item.PurchasePrice} </Text>
      </View>
    </View>
  );

  const SkeletonLoda = () =>(
    <View style={style.contentSkeleton}> 
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'light'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'light'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'light'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'light'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'light'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'light'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'light'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'light'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'light'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'light'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'light'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'light'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'light'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'light'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'light'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'light'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'light'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'light'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'light'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'light'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'light'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'light'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'light'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'light'}  height={15} /> 
      </View>
      <View style={globalStyles.touchList}>
              <Skeleton width={"100%"} colorMode={'light'}  height={18} /> 
              <Spacer height={10}/>
              <Skeleton width={"20%"} colorMode={'light'}  height={10} /> 
              <Spacer height={8}/>
              <Skeleton width={"45%"} colorMode={'light'}  height={15} /> 
      </View>
    </View> 
  )

  const renderFooter = () => {
    if (!loading) return null;
    return (
        <ActivityIndicator animating size="large" />
    );
  };


  return (
    <SafeAreaView style={style.content}>
    
    { loadingData ? <FlatList
                        data={stockData}
                        renderItem={(item) => <Item data={item} />}
                        keyExtractor={item => item.ID}
                        onEndReached={pushScroll}
                        onEndReachedThreshold={.5}
                        ListFooterComponent={renderFooter}
      
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