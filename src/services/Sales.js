import React,{useEffect,useState} from 'react'
import { View, Text,FlatList,SafeAreaView,StyleSheet } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';

import { restoreToken } from '../features/auth/auth'
import { Colors } from '../constants/Colors'
import { globalStyles } from '../styles/global'
export default function ServicesSales() {
    
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
          
          fetch(`https://api.admcloud.net/api/Sales/Detailed?token=${result}&year=2023`, requestOptions)
            .then(response => response.json())
            .then(result => {
    
                const groupedData = Object.values(result.data.reduce((acc, curr) => {
                    if (!acc[curr.SalesRepName]) {
                      acc[curr.SalesRepName] = { id: curr.NCF, SalesRepName: curr.SalesRepName, value: 0 };
                    }
                    acc[curr.SalesRepName].value += curr.TotalAmount;
                    return acc;
                  }, {}));
                
                  setSalesData(groupedData)
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
        <View style={globalStyles.constentList}>
          <Text style={globalStyles.subTitle}>{data.item.SalesRepName}</Text>
          <Text style={globalStyles.lisstTotals}>${data.item.value.toLocaleString()}</Text>
        </View>
      );
  const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />
  return (
    <SafeAreaView style={style.content}>
      <Text style={globalStyles.listTitle}>Resument de Ventas</Text>
      
      { loadingData ? <FlatList
          data={salesData}
          renderItem={(item) => <Item data={item} />}
          keyExtractor={item => item.id}
         
        /> :  <View style={globalStyles.contentSkeleton}> 
                <Skeleton backgroundColor={Colors.primary} highlightColor={Colors.secundary} width={"35%"} colorMode={'ligth'}  height={20} /> 
                <Spacer height={10}/>
                <Skeleton width={"25%"} colorMode={'ligth'}  height={20} /> 
                <Spacer height={20} />
                <Skeleton backgroundColor={Colors.primary} highlightColor={Colors.secundary} width={"35%"} colorMode={'ligth'}  height={20} /> 
                <Spacer height={10}/>
                <Skeleton width={"25%"} colorMode={'ligth'}  height={20} /> 
                <Spacer height={20} />
                <Skeleton backgroundColor={Colors.primary} highlightColor={Colors.secundary} width={"35%"} colorMode={'ligth'}  height={20} /> 
                <Spacer height={10}/>
                <Skeleton width={"25%"} colorMode={'ligth'}  height={20} /> 
                <Spacer height={20} />
                <Skeleton backgroundColor={Colors.primary} highlightColor={Colors.secundary} width={"35%"} colorMode={'ligth'}  height={20} /> 
                <Spacer height={10}/>
                <Skeleton width={"25%"} colorMode={'ligth'}  height={20} /> 
                <Spacer height={20} />
              </View> 
        }        
    </SafeAreaView>
  )
}


const style = StyleSheet.create({
    content:{
       
        backgroundColor:Colors.secundary,
        borderRadius:12,
        borderColor: Colors.Blueligth,
        border:5,
        justifyContent: 'center',
        marginTop:15,
        width:"90%",
    },
  
})