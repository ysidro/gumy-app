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
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';


import { globalStyles } from '../../styles/global'
import CustomFormartDate from '../../components/CustomFormartDate'


export default function AllDelivery({ navigation }) {

  const [deliveryData, setDeliveryData] = useState([]);
  const [loadingData, setLoadingData] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    getAllTaskFormDatabase();
  }, [])

  async function getAllTaskFormDatabase() {
    try {



      const deliveryTasksRef = collection(db, 'deliveryTasks');
      const tasksSnapshot = await getDocs(deliveryTasksRef);
      const tasksData = tasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setDeliveryData(tasksData);
      setLoadingData(true)

    } catch (err) {
      console.error('getAllUsersTaskFormDatabase fail.', err)
    }
  }


  const Item = ({ data }) => {
    let AuthorizationStatusDesc, labelContainer;

    if (data.item.DeliveryStatus === "Completed") {
      AuthorizationStatusDesc = globalStyles.authorizedLabel;
      labelContainer = globalStyles.authorizedLabelContainer;
    }else if(data.item.DeliveryStatus === "Confirm") {
      AuthorizationStatusDesc = globalStyles.pendingLabel;
      labelContainer = globalStyles.pendingLabelContainer;
    }else if(data.item.DeliveryStatus === "Rejected") {
      AuthorizationStatusDesc = globalStyles.pendingLabel;
      labelContainer = globalStyles.rejectedLabelContainer;
    }else{
      AuthorizationStatusDesc = globalStyles.pendingLabel;
      labelContainer = globalStyles.defaultLabelContainer;
    }
    return (
      <TouchableOpacity style={globalStyles.touchList} onPress={() => navigation.navigate('AdmDeliveryDetails', { task: data.item, items: data.item.Items })}>
        <View style={globalStyles.touchList}>

          <View style={globalStyles.rowBetween}>

            <Text style={globalStyles.listTitleText}>
              Status: {data.item.AuthorizationStatusDesc}
            </Text>

            <View style={labelContainer}>
              <Text style={AuthorizationStatusDesc}>
                Delivery: {data.item.DeliveryStatus}
              </Text>
            </View>

          </View>
          
          <Text style={globalStyles.listTitleText}>Cliente: {data.item.RelationshipName}</Text>
          
          <View style={globalStyles.rowBetween}>
            <View style={globalStyles.row5}>
                <Text style={globalStyles.lisLabel}>
                  Doc ID: {data.item.DocID}
                </Text>
            </View>
            <Text style={globalStyles.listContentText}>
                {data.item.Items[0].Name} 
            </Text>
          </View>
          <View style={globalStyles.row5}>
            <Text style={globalStyles.listContentText}>
              SKU: {data.item.Items[0].ItemSKU} 
            </Text>
          </View>

        </View>
      </TouchableOpacity>);
  }

  const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />
  return (
    <>

      <SafeAreaView style={style.content}>
        {loadingData ? <View>
          
            <TouchableOpacity style={[globalStyles.btnPrimaryStyle,{marginTop:35, width:"95%",marginHorizontal:10}]}>
            <Text style={globalStyles.TextWhite}>Asignar un Envio</Text>
          </TouchableOpacity>
          <FlatList
          data={deliveryData}
          renderItem={(item) => <Item data={item} />}
          keyExtractor={item => item.ID}

        /> 
        
       

        </View> : <View style={style.contentSkeleton}>
          <Skeleton width={"95%"} colorMode={'light'} height={35} />
          <View style={style.cartContent}>
            <View style={style.cartItems}>
              <Spacer height={30} />
              <Skeleton width={"20%"} colorMode={'light'} height={10} />
            </View>
            <View style={style.cartItems}>
              <Spacer height={5} />
              <Skeleton width={"70%"} colorMode={'light'} height={15} />
            </View>
            <View style={style.cartItems}>
              <Spacer height={10} />
              <Skeleton width={"20%"} colorMode={'light'} height={10} />
            </View>
            <View style={style.cartItems}>
              <Spacer height={5} />
              <Skeleton width={"50%"} colorMode={'light'} height={15} />
            </View>
            <View style={style.cartItems}>
              <Spacer height={10} />
              <Skeleton width={"20%"} colorMode={'light'} height={10} />
            </View>
            <View style={style.cartItems}>
              <Spacer height={5} />
              <Skeleton width={"90%"} colorMode={'light'} height={15} />
            </View>
            <View style={style.cartItems}>
              <Spacer height={10} />
              <Skeleton width={"20%"} colorMode={'light'} height={10} />
            </View>
            <View style={style.cartItems}>
              <Spacer height={5} />
              <Skeleton width={"70%"} colorMode={'light'} height={15} />
            </View>
          </View>
        </View>
        }
      </SafeAreaView>
    </>
  )
}

const style = StyleSheet.create({
  content: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    width: "100%",
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