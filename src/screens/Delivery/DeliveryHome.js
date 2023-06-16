import * as React from 'react'
import { View, Text,FlatList, SafeAreaView,StyleSheet} from 'react-native'
import { useSelector, useDispatch } from "react-redux"

import { globalStyles } from '../../styles/global'
export default function DeliveryHome() {

  const delivery = useSelector(state => state.user);
  //const dispatch = useDispatch();


  const Item = ({data}) =>  (
    <View style={globalStyles.touchList}>
      <Text style={globalStyles.listTitleText}>Cliente: {data.item.RelationshipName}</Text>
      <View style={globalStyles.rowBetween}>
        <View style={globalStyles.row5}>
          <Text style={globalStyles.lisLabel}>Doc ID: {data.item.DocID}</Text>
         
          
        </View>
        <Text style={globalStyles.listContentText}>{data.item.Items[0].Name} </Text>
       
      </View>
      <View style={globalStyles.row5}>
      <Text style={globalStyles.listContentText}>SKU: {data.item.Items[0].ItemSKU} </Text>
        </View>
      
    </View>
  ); 

  return (
    <SafeAreaView style={style.content}>

     <FlatList
        data={delivery.task}
        renderItem={(item) => <Item data={item} />}
        keyExtractor={item => item.ID}
      
      />
      

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