import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native'
import { Camera, } from 'expo-camera';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc,setDoc, doc, collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { Colors } from '../constants/Colors'

export default function GummyCamera({route, navigation }) {

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [starUpload,setStarUpload] = useState(false);
    const [taskItem,setTaskItem] = useState(null);
    const [progress, setProgress] = useState(0);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [activeFlash, setActiveFlash] = useState("white");
    const cameraRef = useRef(null);


    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
        if(route.params){
            setTaskItem(route.params.task)
        }
        
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
    
                setImage(data.uri);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const savePicture = async () => {
        if (image) {
            try {
                setStarUpload(true);
                const asset = await MediaLibrary.createAssetAsync(image);
                await uploadImage(image, "image");
;
            } catch (error) {
                console.log(error);
                setStarUpload(false);
            }
        }
    };

    async function uploadImage(uri, fileType) {
        const resp = await fetch(uri);
        const blob = await resp.blob();

        const storageRef = ref(storage, "deliveryFile/" + new Date().getTime());
        const uploadTask = uploadBytesResumable(storageRef, blob);

        // listen for events
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              
                setProgress(progress.toFixed());
            },
            (error) => {
                // handle error
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log("File available at", downloadURL);
                    // save record
                    await saveRecord(fileType, downloadURL, new Date().toISOString());
                    setImage("");
                    setStarUpload(false);
                    //alert('Picture saved! 🎉');
                });
            }
        );
    }


    async function handleConfirm(document, DeliveryStatus) {
        try {
            if(DeliveryStatus){  taskItem.DeliveryStatus = DeliveryStatus; }
            taskItem.Documents[taskItem.Documents.length] = document;
            
          await setDoc(doc(db, 'deliveryTasks',  taskItem.ID), taskItem);
          const state = {
            to: taskItem.AssignedBy,
            sound: 'default',
            title: 'Orden Confirmada',
            body: `El delivery ha completado la orden la orden de ${taskItem.RelationshipName}`,
            data: {},
          }
          await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Accept-encoding': 'gzip, deflate',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
          });
          
          if(DeliveryStatus === "Completed"){
            Alert.alert(`🎉 Orden marcada como completada 🎉`)
            navigation.goBack();
          }
          
          
        } catch (error) {
          console.log("handleConfirmModal",error)
        }
        }


    async function saveRecord(fileType, url, createdAt) {
        try {
          const docRef = await addDoc(collection(db, "files"), {
            fileType,
            url,
            createdAt,
          });
          if(taskItem){
            handleConfirm(docRef.id, "Completed")
           
          }else{
            handleConfirm(docRef.id, false)
            Alert.alert(` Imagen Guardada 🎉`)
           
           
          }
          
        //  console.log("document saved correctly", docRef.id);
        } catch (e) {
          console.log('saveRecord',e);
        }
      }

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }
    
    return (
        <View style={styles.container}>
            {!image ? (
                <Camera
                    style={styles.camera}
                    type={type}
                    ref={cameraRef}
                    flashMode={flash}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 30,
                        }}
                    >


                        <TouchableOpacity
                            onPress={() => {
                                setFlash(
                                    flash === Camera.Constants.FlashMode.off
                                        ? Camera.Constants.FlashMode.on
                                        : Camera.Constants.FlashMode.off
                                )
                                setActiveFlash(flash === Camera.Constants.FlashMode.off ? "yellow" : "white")
                            }
                            } >

                            <Ionicons name="flash-outline" size={24} color={activeFlash} />
                        </TouchableOpacity>


                    </View>
                </Camera>
            ) : (
                
                <Image source={{ uri: image }} style={styles.camera} />
                    
                
            )}
            {starUpload ?             <View style={styles.uploadIndicator}>
                <Text style={{color:"#ffffff", textAlign:"center", fontSize:32}}>{progress}%</Text>
                <Text style={{color:"#ffffff", textAlign:"center"}}>Guardando Imagen</Text>
            </View>
            :""}

            {!starUpload ? 
            <View style={styles.controls}>
                {image ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 50,
                        }}
                    >
                        <TouchableOpacity style={styles.btnCamera}
                            onPress={() => setImage(null)}>
                            
                            <AntDesign name="camerao" size={24} style={styles.btnIconStyle} color="white" />
                            <Text style={{color:"#ffffff", textAlign:"center"}}>Tomar Otra</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnCamera}
                            onPress={savePicture}> 
                            <Ionicons name="save-outline" size={24} style={styles.btnIconStyle} color="white" />
                            <Text style={{color:"#ffffff", textAlign:"center"}}>Guardar </Text>
                            

                        </TouchableOpacity>
                      
                    </View>
                ) : (
                    <TouchableOpacity style={styles.btnSecundaryStyle}
                        onPress={takePicture}>
                            
                        <Ionicons name="camera-outline" size={24} style={styles.btnIconStyle} color="white" />

                    </TouchableOpacity>

                )}
                {taskItem &&  image ? <Text style={{color:"#ffffff", textAlign:"center",marginVertical:10,fontSize:12}}>Al guardar la foto, la orden se marcara como completada.</Text> : ""}
            </View>
            :""}
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000',
        padding: 8,
    },
    controls: {
        flex: 0.7,
    },
    button: {
        height: 40,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#E9730F',
        marginLeft: 10,
    },
    camera: {
        flex: 3,
        borderRadius: 20,
    },
    topControls: {
        flex: 1,
    },
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
    uploadIndicator:{
        position: 'absolute',
        left: "32%",
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
        coloir: "#ffffff"
    },
    btnCamera: {
        display: "flex",
        alignItems: "center",
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