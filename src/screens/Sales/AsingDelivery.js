import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Alert } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { db } from '../../firebaseConfig';
import { collection, addDoc, setDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { Colors } from '../../constants/Colors'


export default function AsingDelivery({ navigation, route }) {
    const [addDelivery, setAddDelivery] = useState(null);
    const [delivery, setDelivery] = useState([]);
    const [btnLabel, setBtnLabel] = useState("Asignar a ");
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
    },[])
    
    useEffect(() => {
        sendPushNotification()
    },[notification])
    

    async function sendPushNotification() {
        console.log('Push Notification',notification)
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
                users.push({ id: doc.id, ...doc.data() });
            });
            setDelivery(users);
           // console.log("Users:", users);

        } catch (err) {
            console.error('any fail.', err)
        }
    }

    async function getUserFrontDatabase(){
        collection(db, 'users');
        const userRef = doc(db,'users', addDelivery.id);
        //console.log(addDelivery)
        // setNotification({
        //     to: addDelivery.notifications,
        //     sound: 'default',
        //     title: 'Notificación de GUMI',
        //     body: `Ha sido asignado un encargo, Doc ID: ${addDelivery.DocID} `,
        //     data: {},
        //   });

        if(userRef.exists){
            await updateDoc(userRef,addDelivery);
            //console.log('asing delivery, get user exist')
            saveDeliveryTask();
        }else{
           await setDoc(userRef,addDelivery);
           // console.log('asing delivery, save user to data base');
            saveDeliveryTask();
        }
    }
    
    const asinDeliveryForTask = (deliveryTarget) =>{
       
        const tasks = deliveryTarget.task.length;
        deliveryTarget.task[tasks] = {"AuthorizationStatusDesc" : route.params.order.AuthorizationStatusDesc, 
        "BillingStatusDesc" : route.params.order.BillingStatusDesc, 
        "CalculatedNetAmount" : route.params.order.CalculatedNetAmount, 
        "CalculatedTaxAmount" : route.params.order.CalculatedTaxAmount, 
        "CalculatedTotalAmount" : route.params.order.CalculatedTotalAmount, 
        "CalculatedTotalAmountBeforeRetentions" : route.params.order.CalculatedTotalAmountBeforeRetentions, 
        "CurrencyID" : route.params.order.CurrencyID, 
        "DocDate" : route.params.order.DocDate, 
        "DocID" : route.params.order.DocID, 
        "DocType" : route.params.order.DocType, 
        "DocumentTypeName" : route.params.order.DocumentTypeName, 
        "Documents" : route.params.order.Documents, 
        "EmployeeID" : route.params.order.EmployeeID, 
        "ID" : route.params.order.ID, 
        "InternalPriorityColor" : route.params.order.InternalPriorityColor, 
        "InternalPriorityDesc" : route.params.order.InternalPriorityDesc, 
        "Items" : route.params.order.Items, 
        "LineBasedAuthorizationStatusDesc" : route.params.order.LineBasedAuthorizationStatusDesc, 
        "LocationID" : route.params.order.LocationID, 
        "PaymentTermID" : route.params.order.PaymentTermID, 
        "RelationshipID" : route.params.order.RelationshipID, 
        "RelationshipName" : route.params.order.RelationshipName, 
        "Status" : route.params.order.Status, 
        "StatusDesc" : route.params.order.StatusDesc, 
        "TaxAmount" : route.params.order.TaxAmount, 
        "TextAmount" : route.params.order.TextAmount, 
        "TotalAmount" : route.params.order.TotalAmount};
        console.log(deliveryTarget)
        setAddDelivery(deliveryTarget)
    }
    const saveDeliveryTask = () => {
        setNotification({
            to: addDelivery.notification,
            sound: 'default',
            title: 'Notificación de GUMI',
            body: `Tienes una nueva asignación `,
            data: {},
          });
        Alert.alert(`Encomienda asinada a: ${addDelivery.name}`)
    }

    const validateOrderDelivery = (tasks) => {
        if(tasks.length > 0){
            const result = tasks.filter(task => task.ID === route.params.order.ID)
            console.log('result',result.length)
            if(result.length > 0){
            
               // setAddDelivery()
                setBtnLabel("Esta Orden ya tiene un delivery asignado")
                //Alert.alert(`Esta Orden esta asignada`)
               return false;
            }
        }
        return true;
       
    }
    const Item = ({ data }) => {
        if(validateOrderDelivery(data.item.task)){
        return (<View key={data.index} style={styles.itemDelivery}>
            <TouchableOpacity style={styles.itemDeliveryContainer} onPress={ addDelivery?.id === data.item.id ? null : () => asinDeliveryForTask(data.item)} >
                <MaterialIcons name="delivery-dining" size={24} style={styles.btnIconStyle} color={Colors.primary} />
                <View style={styles.itemDeliveryDetail}>
                    <Text>{data.item.name}</Text>
                    <Text>{data.item.email}</Text>
                </View>
            </TouchableOpacity>
        </View>)
        }
    };
  
    return (
        <SafeAreaView style={styles.content}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContentContainer}>
                    <Text style={styles.subTitle}>{route.params.order.RelationshipName}</Text>
                    <Text style={styles.title}>Selecionar Mensajero</Text>
                    <View style={styles.rowBetween}>
                        <FlatList
                            data={delivery}
                            renderItem={(item) => <Item data={item} />}
                        />
                    </View>

                    <View style={styles.rowBetween}>

                        <TouchableOpacity style={styles.btnPrimaryStyle } onPress={addDelivery ? () => getUserFrontDatabase() : null}>
                            <MaterialIcons name="delivery-dining" size={24} style={styles.btnIconStyle} color="white" />
                            <Text style={styles.btnTextStyle}>{btnLabel} {addDelivery?.name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSecundaryStyle} onPress={() => navigation.navigate('Camera')}>
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
    btnIconStyle: {

    },
    itemDelivery: {
        backgroundColor: 'white',
        borderColor: Colors.secundary,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    itemDeliveryContainer: {
        display: "flex",
        justifyContent: "start",
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
        backgroundColor: Colors.secundary,
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
        backgroundColor: Colors.Blueligth ,
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