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

import { collection, query, where ,onSnapshot  } from 'firebase/firestore';


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

      setTasks(tasksWithImages);
  
    } catch (err) {
        console.error('getAllUsersTaskFormDatabase fail.', err)
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