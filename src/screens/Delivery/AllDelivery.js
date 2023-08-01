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
import { MotiView } from 'moti';
import { collection, query, where ,onSnapshot,getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';

import { restoreToken } from '../../features/auth/auth'
import { globalStyles,salesResume } from '../../styles/global'
import CustomFormartDate from '../../components/CustomFormartDate'


export default function AllDelivery({navigation}) {

  const [deliveryData, setDeliveryData] = useState([]);
  const [loadingData, setLoadingData] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    getAllTaskFormDatabase();
  }, [])

  async function getAllTaskFormDatabase() {
    try {
  
     
      const taskRecord = [];
      const deliveryTasksRef = collection(db, 'deliveryTasks');
      const tasksSnapshot = await getDocs(deliveryTasksRef);
      const tasksData = tasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Obtener todas las imágenes relacionadas con las tareas
      const taskImagePromises = tasksData.map(async (task) => {
        const imagesRef = collection(db, 'files');
        const imagesSnapshot = await getDocs(query(imagesRef, where('id', '==', task.Documents)));
        const imagesData = imagesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return { ...task, images: imagesData };
      });

      // Esperar a que todas las promesas de imágenes se resuelvan
      const tasksWithImages = await Promise.all(taskImagePromises);

      setDeliveryData(tasksWithImages);
      setLoadingData(true)
  
    } catch (err) {
        console.error('getAllUsersTaskFormDatabase fail.', err)
    }
  }


  const Item = ({ data }) => (
    <TouchableOpacity style={globalStyles.touchList} onPress={() => navigation.navigate('AdmDeliveryDetails',{task : data.item, items: data.item.Items }) }>
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

  const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />
  return (
    <>
     
      <SafeAreaView style={style.content}>
        {loadingData ? <FlatList
          data={deliveryData}
          renderItem={(item) => <Item data={item} />}
          keyExtractor={item => item.ID}

        /> : <View style={style.contentSkeleton}>
        <Skeleton width={"95%"} colorMode={'ligth'} height={35} />
        <View style={style.cartContent}>
            <View style={style.cartItems}>
                <Spacer height={30} />
                <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
            </View>
            <View style={style.cartItems}>
                <Spacer height={5} />
                <Skeleton width={"70%"} colorMode={'ligth'} height={15} />
            </View>
            <View style={style.cartItems}>
                <Spacer height={10} />
                <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
            </View>
            <View style={style.cartItems}>
                <Spacer height={5} />
                <Skeleton width={"50%"} colorMode={'ligth'} height={15} />
            </View>
            <View style={style.cartItems}>
                <Spacer height={10} />
                <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
            </View>
            <View style={style.cartItems}>
                <Spacer height={5} />
                <Skeleton width={"90%"} colorMode={'ligth'} height={15} />
            </View>
            <View style={style.cartItems}>
                <Spacer height={10} />
                <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
            </View>
            <View style={style.cartItems}>
                <Spacer height={5} />
                <Skeleton width={"70%"} colorMode={'ligth'} height={15} />
            </View>
        </View>
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
    padding:10,
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