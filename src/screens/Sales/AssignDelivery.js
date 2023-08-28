import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Alert } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Skeleton } from 'moti/skeleton'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
//import { setNotificationToken } from '../../features/user/user'
import { db } from '../../firebaseConfig';
import { collection, where, setDoc, doc,addDoc, query, getDocs } from 'firebase/firestore';
import { globalStyles } from '../../styles/global';
import { Colors } from '../../constants/Colors'


export default function AssignDelivery({ navigation, route }) {
    const { notifications } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [addDelivery, setAddDelivery] = useState(null);
    const [delivery, setDelivery] = useState([]);
    const [btnLabel, setBtnLabel] = useState("Asignar a ");
    const [orderData, setOrderData] = useState(route.params.order)
    const [deliveryInOrderSelected, setDeliveryInOrderSelected] = useState(route.params.deliveryAssigned)
    const [notification, setNotification] = useState(
        {
            to: '',
            sound: 'default',
            title: '',
            body: '',
            data: {},
          }
    );



    useEffect(() => {
        getAllUsersFormDatabase()
   
        if( route.params.deliveryAssigned){
        
            setDelivery( route.params.deliveryAssigned)
        }
    },[]);

    useEffect(() => {

        if(orderData.DeliveryStatus === 'Rejected'){
            orderData.DeliveryStatus =  "Assigned",
            setAddDelivery(orderData)
           // const getDelivery = delivery.filter(delivery => delivery.id === orderData.DeliveryID)
     
            if(deliveryInOrderSelected.notifications){
                setNotification({
                    to: deliveryInOrderSelected.notifications,
                    sound: 'default',
                    title: 'Notificación de Gumi',
                    body: `Ha sido asignado un encargo, Doc ID: ${orderData.DocID} `,
                    data: {},
                });
            }else{
                Alert.alert(`${deliveryInOrderSelected.name ? deliveryInOrderSelected.name  : deliveryInOrderSelected.email} no tiene las notificaciones activas, favor notificar via telefonica`)
            }
            setBtnLabel(`Esta Tarea esta asignada a ${deliveryInOrderSelected.name ? deliveryInOrderSelected.name  : deliveryInOrderSelected.email}`);
        }
    },[delivery]);


    async function sendPushNotification() {

        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(notification),
        });
      }

    async function getAllUsersFormDatabase() {
        try {
            const userRef = collection(db, 'users')
            const snapshot = await getDocs(userRef);
            const users = [];
            

            snapshot.forEach((doc) => {
               
                doc.data().rolle === "delivery" ? users.push({ id: doc.id, ...doc.data() }) : "";
            });

       
            setDelivery(users);
        

        } catch (err) {
            console.error('any fail.', err)
        }
    }

    async function updateUserTask(){
     
        try {
   
            await setDoc(doc(db,'deliveryTasks', orderData.ID), addDelivery);
            Alert.alert(`Encomienda acutalizada con exito`);
            sendPushNotification();
            
            setAddDelivery(null);
            navigation.popToTop();
        } catch (err) {
            console.log('updateUserTask delivery, save user to data base', err);
            Alert.alert(`No hemos podido asignar la tarea`);
        }

    }

    async function selectDeliveryForOrder(deliverySelected){
    
        if(await validateOrderDelivery()){

            const tasks  = {
            AssignedBy : notifications,
            DeliveryID : deliverySelected.id,
            DeliveryStatus : "Assigned",
            AuthorizationStatusDesc : orderData.AuthorizationStatusDesc, 
            BillingStatusDesc : orderData.BillingStatusDesc, 
            CalculatedNetAmount : orderData.CalculatedNetAmount, 
            CalculatedTaxAmount : orderData.CalculatedTaxAmount, 
            CalculatedTotalAmount : orderData.CalculatedTotalAmount, 
            CalculatedTotalAmountBeforeRetentions : orderData.CalculatedTotalAmountBeforeRetentions, 
            CurrencyID : orderData.CurrencyID, 
            DocDate : orderData.DocDate, 
            DocID : orderData.DocID, 
            DocType : orderData.DocType, 
            DocumentTypeName : orderData.DocumentTypeName, 
            Documents : orderData.Documents, 
            EmployeeID : orderData.EmployeeID, 
            ID : orderData.ID, 
            InternalPriorityColor : orderData.InternalPriorityColor, 
            InternalPriorityDesc : orderData.InternalPriorityDesc, 
            Items : orderData.Items, 
            LineBasedAuthorizationStatusDesc : orderData.LineBasedAuthorizationStatusDesc, 
            LocationID : orderData.LocationID, 
            PaymentTermID : orderData.PaymentTermID, 
            RelationshipID : orderData.RelationshipID, 
            RelationshipName : orderData.RelationshipName, 
            Status : orderData.Status, 
            StatusDesc : orderData.StatusDesc, 
            TaxAmount : orderData.TaxAmount, 
            TextAmount : orderData.TextAmount, 
            TotalAmount : orderData.TotalAmount
            };
            console.log("ya esta asignada",deliverySelected)
            setAddDelivery(tasks)
            if(deliverySelected.notifications){
                setNotification({
                    to: deliverySelected.notifications,
                    sound: 'default',
                    title: 'Notificación de Gumi',
                    body: `Ha sido asignado un encargo, Doc ID: ${orderData.DocID} `,
                    data: {},
                });
            }else{
              
                Alert.alert(`${deliverySelected.name ? deliverySelected.name  : deliverySelected.email} no tiene las notificaciones activas, favor notificar via telefonica`)
            }
            setBtnLabel(`Esta Tarea esta asignada a ${deliverySelected.name ? deliverySelected.name  : deliverySelected.email}`);
        }else{
            console.log("ya esta asignada")
            Alert.alert(`ya esta asignada a ${deliverySelected.name ? deliverySelected.name  : deliverySelected.email}, favor notificar via telefonica`)
        }

    }
    const handlerCamera = () => {

       if(!validateOrderDelivery()){
        navigation.navigate('Camera', {task: orderData})
       }else{
        Alert.alert('Asigne un delivery primero')
       }
    }

    const validateOrderDelivery =  async () => {
        const tasksHistory = [];
        const deliveryTasksRef = collection(db, "deliveryTasks");
        let itsAssigned = true;
        // Create a query against the collection.
        const q = query(deliveryTasksRef, where("ID", "==", orderData.ID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
                const task = doc.data();
                tasksHistory.push(task);
        });

        if(tasksHistory.length > 0){
            itsAssigned = false;
        }
  
        return itsAssigned;
    }

    const Item = ({data}) => {
        console.log(data.item,"data item delivery")
        //if(validateOrderDelivery(data.item.task)){
        return (<View key={data.index} style={styles.itemDelivery}>
            <TouchableOpacity style={ styles.itemDeliveryContainer} onPress={ addDelivery?.id === data.item.id ? null : () => selectDeliveryForOrder(data.item) } >
                <MaterialIcons name="delivery-dining" size={40} style={styles.btnIconStyle} color={Colors.primary} />
                <View style={styles.itemDeliveryDetail}>
                    <Text style={styles.labelName}>{data.item.name ? data.item.name : "No Name"}</Text>
                    <Text  style={styles.labelEmail}>{data.item.email}</Text>
                </View>
            </TouchableOpacity>
        </View>)
    // }
    };
  // orderData.RelationshipName
    return (
        <SafeAreaView style={styles.content}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContentContainer}>
                    <Text style={styles.subTitle}>{}</Text>
                    <Text style={styles.title}>Selecionar Mensajero</Text>
                    {delivery ? 
                    <View style={styles.rowBetween}>
                        <FlatList
                            data={delivery}
                            renderItem={(item) => <Item data={item} />}
                            keyExtractor={item => item.id}
                        />
                    </View> 
                    :
                    <View  style={styles.itemDelivery}>
                        <View style={styles.itemDeliveryDetail}>
                            <View style={{marginBottom:10}}>
                            <Skeleton width={"100%"} colorMode={'light'}   height={20} />
                            </View>  
                            <Skeleton width={"100%"} colorMode={'light'}   height={10} />
                        </View> 
                    </View> 
                    }
                    <View style={styles.rowBetween}>

                        <TouchableOpacity style={addDelivery ?  styles.btnPrimaryStyle  : styles.btnPrimaryStyleNull } onPress={addDelivery ? () => updateUserTask() : null}>
                            <MaterialIcons name="delivery-dining" size={24} style={styles.btnIconStyle} color="white" />
                            <Text style={styles.btnTextStyle}>{btnLabel} {delivery.name ? delivery.name : delivery.email}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSecundaryStyle} onPress={() => handlerCamera() }>
                            <Ionicons name="camera-outline" size={24} style={styles.btnIconStyle} color="white" />
                            <Text style={styles.btnTextStyle}>Capturar Documento</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        marginTop: 15,
        width: "100%",
    },
    btnTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginHorizontal: 5,
        paddingTop: 5,
    },
    btnIconStyle: { },
    labelName:{
        fontWeight: 300,
        fontSize: 22,
        color: Colors.primary
    },
    labelEmail:{
        fontWeight: 'bold',
        fontSize: 10,
        color:"#000000"
    },
    itemDelivery: {
        backgroundColor: 'white',
        borderColor: Colors.secondary,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    itemDeliveryContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignContent: "center",
        flexWrap: "nowrap",
        flexDirection: "row",
    },
    itemDeliveryDetail: {
        marginLeft: 10,
    },
    btnSecundaryStyle: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: Colors.secondary,
        padding: 12,
        borderRadius: 8,
        width: "100%",
        marginVertical: 10,
        flexDirection: "row",
        color: "#ffffff"
    },

    btnPrimaryStyle: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: Colors.primary,
        padding: 12,
        borderRadius: 8,
        width: "100%",
        marginVertical: 10,
        flexDirection: "row",
        color: "#ffffff"
    },

    btnPrimaryStyleNull: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: Colors.grey,
        padding: 12,
        borderRadius: 8,
        width: "100%",
        marginVertical: 10,
        flexDirection: "row",
        color: "#dddddd"
    },
    title: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.primary,
        marginBottom: 10,
    },
    subTitle: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "light",
        color: "#000000",
    },
    modalContentContainer: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: "100%",
        paddingHorizontal: 20,
        paddingVertical: 20,

    },
    rowBetween: {
        width: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }

})