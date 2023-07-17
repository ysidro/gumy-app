import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native'
import { Camera, } from 'expo-camera';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { Colors } from '../constants/Colors'

export default function GummyCamera({navigation}) {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
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
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const savePicture = async () => {
        if (image) {
            try {
                const asset = await MediaLibrary.createAssetAsync(image);
                alert('Picture saved! 🎉');
                setImage(null);
                console.log('saved successfully');
            } catch (error) {
                console.log(error);
            }
        }
    };

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
                            onPress={() =>
                               { setFlash(
                                    flash === Camera.Constants.FlashMode.off
                                        ? Camera.Constants.FlashMode.on
                                        : Camera.Constants.FlashMode.off
                                )
                                setActiveFlash(flash === Camera.Constants.FlashMode.off ? "yellow" : "white"  )
                            }
                            } >
                          
                            <Ionicons name="flash-outline" size={24} color={activeFlash} />
                        </TouchableOpacity>


                    </View>
                </Camera>
            ) : (
                <Image source={{ uri: image }} style={styles.camera} />
            )}

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
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnCamera}
                           onPress={savePicture}>
                            <Ionicons name="save-outline" size={24} style={styles.btnIconStyle} color="white" />
                           
                        </TouchableOpacity>
                       
                    </View>
                ) : (
                    <TouchableOpacity style={styles.btnSecundaryStyle}
                    onPress={takePicture}>
                            <Ionicons name="camera-outline" size={24} style={styles.btnIconStyle} color="white" />
                            
                        </TouchableOpacity>
                 
                )}
            </View>
        </View>
    );

    /* 
   return (
       <SafeAreaView style={styles.content}>
           <View style={styles.modalContainer}>
               <View style={styles.modalContentContainer}>
                   <Text style={styles.title}>Selecionar Mensajero</Text>
                   <View style={styles.rowBetween}>
                   </View>
                   <View style={styles.rowBetween}>
                       <TouchableOpacity style={styles.btnSecundaryStyle} onPress={handleCameraPress} >
                           <AntDesign name="camerao" size={24} style={styles.btnIconStyle} color="white" />
                           <Text style={styles.btnTextStyle}>Capturar Documento</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.btnPrimaryStyle}>
                           <MaterialIcons name="delivery-dining" size={24} style={styles.btnIconStyle} color="white" />
                           <Text style={styles.btnTextStyle}>Asignar</Text>
                       </TouchableOpacity>

                   </View>
               </View>
           </View>
       </SafeAreaView>
   ) */
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000',
        padding: 8,
    },
    controls: {
        flex: 0.5,
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
    btnCamera:{},
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