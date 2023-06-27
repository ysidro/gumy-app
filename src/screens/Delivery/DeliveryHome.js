import * as React from 'react'
import { View, Text,FlatList, SafeAreaView,StyleSheet,TouchableOpacity} from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { useSelector, useDispatch } from "react-redux"
import { db, auth } from '../../firebaseConfig';
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { collection, addDoc, setDoc,onSnapshot, doc, updateDoc, getDocs } from 'firebase/firestore';
import { signOut } from '../../features/auth/auth'

import { globalStyles } from '../../styles/global'

export default function DeliveryHome({navigation}) {
  const dispatch = useDispatch()
  const delivery = useSelector(state => state.user);
  React.useEffect(() => {
   // console.log("delivery",delivery)

},[])

React.useEffect(() => {

  try {
    
    onAuthStateChanged(auth, (user) => {
      
      if (!user) {
       
        SecureStore.deleteItemAsync('uToken')
        SecureStore.deleteItemAsync('userRoll')
         dispatch(signOut())
        console.log('No user is currently signed in.',user);
      }
    });
  } catch (err) {
    Alert.error("Hubo un problema al obtener la información del servidor, favor revisar tu coneccción")
    console.error('Failed to get the current user:', err);
  }
// Call the getCurrentUser function whenever you want to check the current user


},[])

  const Item = ({data}) =>  (
    <TouchableOpacity style={globalStyles.touchList} onPress={() => navigation.navigate('Detalle',{task : data.item, items: data.item.Items }) }>
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
    </TouchableOpacity>
  ); 

  return (
    <SafeAreaView style={style.content}>

     { delivery.task.length > 0 ? <FlatList
        data={delivery.task}
        renderItem={(item) => <Item data={item} />}
        keyExtractor={item => item.ID}
      
      />
      :  
      <View style={style.content}>
        <Text  style={style.title}>No hay delivery</Text> 
      </View>  
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
  title:{
    textAlign: 'center',
    width:"100%",
    fontSize:18,
    fontWeight:700
   
  }
  
})