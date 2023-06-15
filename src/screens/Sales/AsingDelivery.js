import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Alert } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { db } from '../../firebaseConfig';
import { collection, addDoc, setDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { Colors } from '../../constants/Colors'


export default function AsingDelivery({ navigation, route }) {
    const [addDelivery, setAddDelivery] = useState(null);
    const [delivery, setDelivery] = useState([]);

    useEffect(() => {
        getAllUsersFormDatabase()
    },[])
    
   

    async function getAllUsersFormDatabase() {
        try {
            const userRef = collection(db, 'users')
            const snapshot = await getDocs(userRef);

            const users = [];
            snapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });
            setDelivery(users);
            //console.log("Users:", users);

        } catch (err) {
            console.error('any fail.', err)
        }
    }

    async function getUserFrontDatabase(){

       
        
        console.log(addDelivery.id);

        collection(db, 'users');
        const userRef = doc(db,'users', addDelivery.id);

        if(userRef.exists){
            await updateDoc(userRef,addDelivery);
            console.log('get user exist')
            saveDeliveryTask();
        }else{
          await setDoc(userRef,addDelivery);
          console.log('save user to data base');
        }
        
    
    }
    
    const asinDeliveryForTask = (delivery) =>{
        const tasks = delivery.task.length;
        delivery.task[tasks] = route.params.order;
        setAddDelivery(delivery)
    }
    const saveDeliveryTask = () => {
        Alert.alert(`Encomienda asinada a: ${addDelivery.name}`)
    }
    const Item = ({ data }) => {

        return (<View key={data.index} style={styles.itemDelivery}>
            <TouchableOpacity style={styles.itemDeliveryContainer} onPress={ addDelivery?.id === data.item.id ? null : () => asinDeliveryForTask(data.item)} >
                <MaterialIcons name="delivery-dining" size={24} style={styles.btnIconStyle} color={Colors.primary} />
                <View style={styles.itemDeliveryDetail}>
                    <Text>{data.item.name}</Text>
                    <Text>{data.item.email}</Text>
                </View>
            </TouchableOpacity>
        </View>)
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

                        <TouchableOpacity style={styles.btnPrimaryStyle} onPress={addDelivery ? () => getUserFrontDatabase() : null}>
                            <MaterialIcons name="delivery-dining" size={24} style={styles.btnIconStyle} color="white" />
                            <Text style={styles.btnTextStyle}>Asignar: {addDelivery?.name}</Text>
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
        coloir: "#ffffff"
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
        coloir: "#ffffff"
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