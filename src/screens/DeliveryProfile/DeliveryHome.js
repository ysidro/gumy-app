import * as React from 'react'
import { View, Text,FlatList, SafeAreaView,StyleSheet,TouchableOpacity, ActivityIndicator} from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { useSelector, useDispatch } from "react-redux"
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { db, auth } from '../../firebaseConfig';
import { collection, query, where ,onSnapshot  } from 'firebase/firestore';
import { signOut } from '../../features/auth/auth'
import { globalStyles } from '../../styles/global'

export default function DeliveryHome({navigation}) {
  const dispatch = useDispatch()
  const delivery = useSelector(state => state.user);
  const [listTask,setListTask] = React.useState([]);

  React.useEffect(() => {
        getAllUsersTaskFormDatabase();
  },[delivery])

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

async function getAllUsersTaskFormDatabase() {
  try {


    const deliveryTasksRef = collection(db, 'deliveryTasks');
    const q = query(deliveryTasksRef, where('DeliveryID', '==', delivery.id ));

    onSnapshot(q, (querySnapshot) => {
      const taskRecord = [];
      querySnapshot.forEach((doc) => {
        const taskExists = doc.data();
        taskRecord.push(taskExists);
      });
      setListTask(taskRecord);
    });

  } catch (err) {
      console.error('getAllUsersTaskFormDatabase fail.', err)
  }
}

  const Item = ({data}) =>  (
    <TouchableOpacity style={globalStyles.touchList} onPress={() => navigation.navigate('Detalle',{task : data.item, items: data.item.Items }) }>
    <View style={globalStyles.touchList}>
      <Text style={globalStyles.listTitleText}>Status: {data.item.AuthorizationStatusDesc}</Text>
      <Text style={globalStyles.lisLabel}>Delivery Status: {data.item.DeliveryStatus}</Text>
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

    { listTask.length > 0 ? <FlatList
        data={listTask}
        renderItem={(item) => <Item data={item} />}
        keyExtractor={item => item.ID}
      />
      :  
      <View style={style.content}>
        <ActivityIndicator/>
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