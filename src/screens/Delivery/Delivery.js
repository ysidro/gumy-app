import React, { useEffect, useState } from 'react'
import {
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'

import { restoreToken } from '../../features/auth/auth'
import { globalStyles,salesResume } from '../../styles/global'
import CustomFormartDate from '../../components/CustomFormartDate'


export default function Delivery({navigation}) {

  const [deliveryData, setDeliveryData] = useState([]);
  const [loadingData, setLoadingData] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    getValueFor('uToken')
    
  }, [])

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

        fetch(`https://api.admcloud.net/api/Dispatchs?token=${result}&skip=0`, requestOptions)
          .then(response => response.json())
          .then(result => {
            
            setDeliveryData(result.data)
            setLoadingData(true)
            
          })
          .catch(error => console.log('error', error));
      } else {
        dispatch(restoreToken(null))
        console.log('Dispatchs no data');
      }
    }
    catch (err) {
      console.error('Dispatchs any fail.', err);
    }
  }


  const Item = ({ data }) => (
    <TouchableOpacity style={globalStyles.touchList} onPress={() => navigation.navigate('Detalle',{deliveryID : data.item.ID, locationID : data.item.LocationID }) }>
       <View style={globalStyles.rowBetween}>
        <View >
        <Text style={globalStyles.lisLabel}>{data.item.DocID}</Text>
          <Text style={globalStyles.subTitle}>{data.item.RelationshipName}</Text>
          <Text style={globalStyles.lisLabel}>{data.item.LocationName}</Text>
         
          <Text style={globalStyles.listTitleText}>{data.item.StatusDesc}</Text>
        </View>
        <View >
          <Text style={style.lisstTotals}>${data.item.TotalAmount.toLocaleString()}</Text>
          <CustomFormartDate style={salesResume.listSubTitleText} DocDate={data.item.DocDate}/>
        
        </View>
      </View>
    </TouchableOpacity>
    

  );


  return (
    <>
     
      <SafeAreaView style={style.content}>
        {loadingData ? <FlatList
          data={deliveryData}
          renderItem={(item) => <Item data={item} />}
          keyExtractor={item => item.ID}

        /> : <View style={style.contentSkeleton}>
          <Skeleton width={"95%"} colorMode={'ligth'} height={310} />
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
  contentSkeleton: {
    width: "100%",
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  constentList: {
    paddingTop: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    width: "95%",
  },
  listTitle: {
    fontWeight: "bold",
    fontSize: 26,
    margin: 10,
  },
  listTitleText: {

  },
  lisstTotals: {
    fontWeight: "bold",
    fontSize: 18,

  },
})