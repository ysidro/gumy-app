import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView,TouchableOpacity,Image } from 'react-native'

import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';

import { db } from '../../firebaseConfig';
import { collection,doc, getDoc , query, where ,onSnapshot  } from 'firebase/firestore';
import { Colors } from '../../constants/Colors';
import CustomFormartDate from '../../components/CustomFormartDate'
import { globalStyles,salesResume } from '../../styles/global'

export default function AdmDeliveryDetails({ route, navigation }) {

    const task = route.params.task
    const [deliveryData, setDeliveryData] = useState(task);
    const [loadingData, setLoadingData] = useState(null);
    const [imageData, setImageData] = useState(null)
  
    
    useEffect(() => {
      // Función asincrónica para obtener las imágenes por ID
      const fetchImageData = async () => {
        try {
          
          const imageIds = task.Documents;
          if(imageIds.length <= 0) { setLoadingData(true)
            return};
          const imageCollection = []
          // Obtener las imágenes según sus IDs
          const imagePromises = imageIds.map(async (imageId) => {
            const imageRef = doc(db, 'files', imageId);
            const imageSnapshot = await getDoc(imageRef);
            return imageSnapshot.exists() ? imageSnapshot.data() : null;
          });
  
          // Esperar a que todas las promesas de imágenes se resuelvan
          const imagesData = await Promise.all(imagePromises);
  
          // Filtrar las imágenes que existen (pueden haber null para IDs no encontrados)
          const filteredImages = imagesData.filter((image) => image !== null);
       
          setImageData(filteredImages);
          setLoadingData(true)
        } catch (error) {
          console.error('Error al obtener imágenes por ID:', error);
        }
      };
  
      fetchImageData();
    }, []);
  

  
    async function handleConfirmModal(action) {
      try {
        taskItem.DeliveryStatus = action
        await setDoc(doc(db, 'deliveryTasks', taskItem.ID), taskItem);
        const state = {
          to: taskItem.AssignedBy,
          sound: 'default',
          title: 'Orden Confirmada',
          body: `El delivery ha confirmado la orden la orden`,
          data: {},
        }
        await sendNotification(state)
        setTaskStatus(action);
        Alert.alert(`Orden Confirmada`)
      } catch (error) {
        console.log("handleConfirmModal", error)
      }
    }
   
    
  
    const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />

  return (
    <SafeAreaView style={style.content}>
      {loadingData ?
        <ScrollView>
        <View style={style.cartContent}>
        <View style={style.cartItems}>
            <View ><Text>{deliveryData.PriorityDesc}</Text>
            <Text>Orden {deliveryData.DeliveryStatus}</Text>
            </View>
            <View style={globalStyles.rowBetween}>
                <Text style={globalStyles.listTitleText}>{deliveryData.DocID}</Text>
                <CustomFormartDate style={salesResume.listSubTitleText} DocDate={deliveryData.DocDate}/>
            </View>
            <View style={globalStyles.rowBetween}>
            <Text style={globalStyles.subTitle}>{deliveryData.RelationshipName}</Text>
            <Text style={globalStyles.subTitle}>{deliveryData.deli}</Text>
            </View>
            <View style={globalStyles.rowBetween}>
                
                <Text style={globalStyles.lisLabel}>{deliveryData.LineBasedAuthorizationStatusDesc}</Text>
                <Text style={globalStyles.lisLabel}>{deliveryData.BillingStatusDesc}</Text>
            </View>

            {deliveryData.DeliveryStatus === "Rejected" ? 
              <View>
                <TouchableOpacity style={globalStyles.btnWarning} onPress={() => navigation.navigate('OrderDetails', { orderID:deliveryData.ID })}>
                  <Text style={globalStyles.TextWhite}>Re-Asignar Orden</Text>
                </TouchableOpacity>
            
                <Text> El delivery justifica que: </Text>
                <Text> {deliveryData.DeliveryComments}</Text>
              </View>
            : "" }
            {imageData?.map(img => <Image key={img.id} source={{ uri: img.url }} style={{ width: 300, height: 300, margin:10 }} />
            )}
           </View>
        </View>
        { deliveryData.InternalNotes ? <View style={style.cartContent}>
            <View style={style.cartItems}>
                <Text>{deliveryData.InternalNotes}</Text>
            </View>
        </View> : ""}
        <View style={style.cartContent}>
            
            <View >
                <View style={style.cartItems}>
                <Text style={globalStyles.subTitle}>Desglose pedido</Text></View>
            { 
                deliveryData.Items.map((v,i) => (
                    <View key={v.ItemSKU} style={style.cartItems}>
                        <View style={globalStyles.rowBetween}>
                            <Text style={globalStyles.lisLabel}>{v.ItemSKU}</Text>
                            <Text style={globalStyles.lisLabel}>{v.AuthorizationStatusDesc}</Text>
                        </View>
                        <Text style={globalStyles.subTitle}>{v.Name}</Text>
                        <View style={globalStyles.rowBetween}>
                            <View style={globalStyles.row5}>
                                <Text>{v.UOMName}</Text>
                                <Text> {v.Quantity}</Text>
                            </View>
                            <Text>${v.Cost}</Text>
                        </View>
                    </View>
                ))
            }
            </View>
        
        </View>
        </ScrollView>
        
        :
        <View style={style.contentSkeleton}>
        <Skeleton width={"100%"} colorMode={'light'} height={35} />
        <View style={style.cartContent}>
          <View style={style.cartItems}>
            <Spacer height={30}/>
            <Skeleton width={"20%"} colorMode={'light'} height={10} />
          </View>
          <View style={style.cartItems}>
            <Spacer height={5}/>
            <Skeleton width={"70%"} colorMode={'light'} height={15} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={10}/>
            <Skeleton width={"20%"} colorMode={'light'} height={10} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={5}/>
            <Skeleton width={"50%"} colorMode={'light'} height={15} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={10}/>
            <Skeleton width={"20%"} colorMode={'light'} height={10} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={5}/>
            <Skeleton width={"90%"} colorMode={'light'} height={15} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={10}/>
            <Skeleton width={"20%"} colorMode={'light'} height={10} />
            </View>
          <View style={style.cartItems}>
            <Spacer height={5}/>
            <Skeleton width={"70%"} colorMode={'light'} height={15} />
          </View>
        </View>
      </View>
      }
    </SafeAreaView>
  )
  
}

const style = StyleSheet.create({
    content: {
      justifyContent: 'center',
      width: "100%",
    },
    cartContent: {
      paddingVertical: 18,
      margin:8,
      backgroundColor: Colors.white,
      borderRadius:12,
    },
    cartItems: {
      paddingHorizontal: 18,
      paddingVertical: 6,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: "center",
      marginTop: 15,
      marginBottom: 0,
      marginHorizontal: 10,
      color: Colors.primary,
    },
    listTitle: {
      fontWeight: "bold",
      fontSize: 12,
      color: Colors.grey,
    },
    listTitleText: {
      color: Colors.secondary,
      fontSize: 18,
      fontWeight: "bold",
    },
    mapLink:{
      backgroundColor: Colors.primary,
      borderRadius: 8,
      padding:16,
    },
    mapLinkWarning:{
      backgroundColor: Colors.red,
      borderRadius: 8,
      padding:16,
    },
    mapLinkText:{
      color: Colors.Bluelight,
      textAlign:'center',
      fontWeight: 'bold',
    },
    regularButton:{
      backgroundColor: Colors.Secondary,
      borderRadius: 8,
      padding:14,
    },
    contentSkeleton:{
      justifyContent: 'center',
      width: "100%",
      padding:16,
    }
  
  })