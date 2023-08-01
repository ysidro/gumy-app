import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Alert, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native'
import "react-native-gesture-handler";
import { db } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Skeleton } from 'moti/skeleton'
import CustomInputs from '../../components/CustomInputs'
import { BottomSheetModal, BottomSheetModalProvider, } from "@gorhom/bottom-sheet";

import { Colors } from '../../constants/Colors';
import { globalStyles, salesResume } from '../../styles/global'
export default function DeliveryTask({ route, navigation }) {



  const taskItem = route.params.task;
  const items = route.params.items;

  const [device, setDevice] = useState(false);
  const [taskStatus, setTaskStatus] = useState(false);
  const [justified, setJustifica] = useState(null);
  
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["48%", "75%"];
  const { width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }

  useEffect(() => {
    setTaskStatus(taskItem.DeliveryStatus)
  }, [])

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

  async function handleJustifyModal(action) {
    if (justified) {
      bottomSheetModalRef.current?.present();

      try {

        const state = {
          to: taskItem.AssignedBy,
          sound: 'default',
          title: 'Orden Declinada',
          body: `a declinado la orden por: ${justified}`,
          data: {},
        }

        taskItem.DeliveryStatus = action;
        taskItem.DeliveryComments = justified;

        //const deliveryRef =  await getDoc(doc(db, 'deliveryTasks',taskItem.ID));
        await setDoc(doc(db, 'deliveryTasks', taskItem.ID), taskItem);
        setTaskStatus(action);
        await sendNotification(state)

        Alert.alert(`Esta Orden ha Declinada`)


        setTimeout(() => {
          setIsOpen(false);
        }, 0);

      } catch (err) {
        console.error("deliveryTasks err", err)
      }


    } else {
      Alert.alert("Debes justificar el motivo para declinar esta tarea");
    }
  }

  async function sendNotification(state)
  {
    try {
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      });
    } catch (err) {}
  }

  return (

    <BottomSheetModalProvider>
      <ScrollView>
        <View style={styles.cartContent}>
          <View style={styles.cartItems}>
            <Text style={styles.listTitleText}>{taskItem.BillingStatusDesc}</Text>
            <Text style={styles.listTitleText}>{taskItem.StatusDesc}</Text>
            <Text style={styles.listTitle}>Documento: {taskItem.DocID}</Text>
            <Text style={styles.listTitle}>Prioridad:{taskItem.InternalPriorityDesc}</Text>
            <Text style={styles.title}>{taskItem.RelationshipName}</Text>
            {taskStatus === "Completed" ? <View style={styles.cartItems}><Text style={[globalStyles.listTitleText, { textAlign: "center", fontSize: 16 }]}>Orden Completada</Text></View> : ""}
          </View>
        </View>
        <View >
          <View style={styles.cartItems}>
            <Text style={globalStyles.subTitle}>Desglose pedido</Text></View>
          {
            items.map((v, i) => (
              <View key={i} style={styles.cartItems}>
                <View style={globalStyles.rowBetween}>
                  <Text style={globalStyles.lisLabel}>{v.ItemSKU}</Text>
                  <Text style={globalStyles.lisLabel}>{v.AuthorizationStatusDesc}</Text>
                </View>
                <Text style={globalStyles.subTitle}>{v.Name}</Text>
                <View style={globalStyles.rowBetween}>

                  <Text>Cantidad: {v.Quantity} {v.UOMName}/s </Text>
                </View>
              </View>
            ))
          }
        </View>
        {taskStatus !== "Completed" ? <View style={styles.cartItems}>
          <TouchableOpacity style={styles.btnRechasarStyle} onPress={() => handlePresentModal()}>

            <Text style={styles.btnTextStyle}>Declinar pedido</Text>
          </TouchableOpacity>
          {taskStatus === "Confirm" ? <TouchableOpacity style={styles.btnSecondaryStyle} onPress={() => navigation.navigate('Camera', { task: taskItem })}>
            <Ionicons name="camera-outline" size={24} color="white" />
            <Text style={styles.btnTextStyle}>Capturar Documento</Text>
          </TouchableOpacity> : <TouchableOpacity style={styles.btnSecondaryStyle} onPress={() => handleConfirmModal("Confirm")}>
            <MaterialIcons name="delivery-dining" size={24} color="white" />
            <Text style={styles.btnTextStyle}>Confirmar</Text>
          </TouchableOpacity>}
        </View> : ""}
      </ScrollView>
      <BottomSheetModal

        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: 8 }}
        onDismiss={() => setIsOpen(false)}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Justificar</Text>
          <Text style={styles.description}>Describe la razón por la cual estas declinando esta orden para que sea corregído el error. </Text>

          <CustomInputs label={"Justifica porque Declinas la Orden"} value={justified} onChangeText={setJustifica} />

          <TouchableOpacity style={styles.btnSecondaryStyle} onPress={() => handleJustifyModal("Rejected")}>
            <Text style={styles.btnTextStyle}>Notificar</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>

  )
}


const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },

  cartContent: {
    paddingVertical: 18,
    margin: 8,
    backgroundColor: Colors.white,
    color: Colors.black,
    borderRadius: 12,
  },

  cartItems: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    display: "flex",
    justifyContent: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 10,
    color: "#000",
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
  mapLink: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
  },
  mapLinkWarning: {
    backgroundColor: Colors.red,
    borderRadius: 8,
    padding: 16,
  },
  mapLinkText: {
    color: Colors.Bluebright,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  regularButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    padding: 14,
  },
  contentSkeleton: {
    justifyContent: 'center',
    width: "100%",
    padding: 16,
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
  btnSecondaryStyle: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: Colors.secondary,
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
  },

  btnRechasarStyle: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: Colors.red,
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
  },

  btnTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: 5,
    paddingTop: 5,
  },
  btnIconStyle: {

  }
})