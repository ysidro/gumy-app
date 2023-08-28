import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setAuthState } from "../../features/auth/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db,auth } from '../../firebaseConfig';
import { collection,doc, query, where, getDocs,setDoc, deleteDoc } from 'firebase/firestore';

import CustomInput from "../CustomInputs";
import CustomButtons from "../CustomButtons";

import { globalStyles } from "../../styles/global";
import { Colors } from "../../constants/Colors";
export default function SingInByToken() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [registerID, setRegisterID] = useState(null)
    const [userData, setUserData] = useState(null);
    const [password, setPassword] = useState(null);
    const [labels, setLabels] = useState({
        title: "Validar tu Token",
        btn: "Validar",
        input: "Token"
    });

    async function removeRegister(){
        const userDocRef = doc(db, 'users', registerID);

                await deleteDoc(userDocRef)
                .then(() => {
                    console.log('Documento eliminado correctamente.');
                })
                .catch((error) => {
                    console.error('Error al eliminar el documento:', error);
                });
    }

    function generateRandomNumber() {
        const min = 100000; // Mínimo valor de 6 dígitos (100000)
        const max = 999999; // Máximo valor de 6 dígitos (999999)
        return Math.floor(Math.random() * (max - min + 1)) + min;
        
      }
    async function getUsersByToken() {
         const usersRef = collection(db, "users");
     
        const stateQuery = query(usersRef, where("token", "==", parseInt(token)));
        const querySnapshot = await getDocs(stateQuery);
    
        try {
            if(!querySnapshot.empty){
                querySnapshot.forEach((doc) => {
                 
                   
                    setRegisterID(doc.id)
                    setUserData(doc.data())
                    
                    setLabels({
                        title: "Confirmar Cuenta",
                        btn: "Confirmar",
                        input :"Password",
                    })
                    setLoading(false);

                   
                });
            }else{
                Alert.alert("El token suministrado no es valido", "verificar e intentar de nuevo")
                setLoading(false);
                return
            }

        } catch (error) {
            setLoading(false);
            console.error("Error in forEach loop:", error);
        
        }
        
    };

    const handlerFirebaseSubmit = async () => {
        setLoading(true);

        if (token === null || token === "" || token.length !== 6) {
            Alert.alert("El token suministrado no es valido", "verificar e intentar de nuevo")
            setLoading(false);
            return
        }
        await getUsersByToken();
    }

    function handlerFirebaseAuthSubmit(){
        createAuthUsers();
    }

    const createAuthUsers = () => {
        console.log("Signed in", registerID,userData)

        createUserWithEmailAndPassword(auth,userData.email, password)
       .then((userCredential) => {
        
    
        const user = userCredential.user;
        userData.id = user.uid;
        userData.token = generateRandomNumber();
        updateProfile((user),{
            displayName: userData.name,
            providerId: userData.rolle,
            tenantId:userData.adm_token
        }).then(function() {
            setDoc(doc(db,'users', user.uid), userData);
        }, function(error) {
            console.log('updateProfile error',error)
            // An error happened.
        });  
        removeRegister()
        Alert.alert("Cuenta Validada Con exito", "Hora puedes usar la pantalla de login de Gumi Services para hacer login")
      })
      .catch((error) => {
        console.log('User registered erro:', error);
        // ..
      });
    }
 
    return (
        <View style={globalStyles.screenContainer}>
            <Text style={globalStyles.title}>{labels.title}</Text>

            {!userData ? <>
            
                <CustomInput 
                label={labels.input} 
                value={token} 
                onChangeText={setToken} />
                
                <CustomButtons
                title={!loading ? labels.btn :"Validando..." }
                onPress={!loading ? async () => await handlerFirebaseSubmit() : null }
            />
                
            </> 
            
            :   <> 
            <View style={[globalStyles.constentList,{marginVertical:10}]}>
                <Text style={globalStyles.listTitleText}>{userData.name}</Text>
                <Text style={globalStyles.lisLabel}>{userData.email}</Text>
            </View>
            <CustomInput 
                label={labels.input}     
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}/>

                
                
            <CustomButtons
                title={!loading ? labels.btn :"Validando..." }
                onPress={!loading ? async () => await handlerFirebaseAuthSubmit() : null }
            /> 
            </>}
            
            {loading ? <ActivityIndicator/> : ""}
            <TouchableOpacity style={styles.btnSwitchProfile} onPress={() => dispatch(setAuthState('signIn'))}>
                
                <Text style={styles.btnSwitchProfileLabel}>Regresar</Text>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    contentAlert: {
        backgroundColor: Colors.red,
        padding: 10,
        width: "90%",
        margin: 10,
        borderRadius: 8,
    },
    textAlert: {
        color: Colors.light,
    },
    btnShowPassword: {
        padding: 10,
        fontWeight: "bold",
        color: Colors.secondary,
    },
    btnSwitchProfile: {
        marginTop: 30,
    },
    btnSwitchProfileLabel: {
        padding: 10,
        color: Colors.secondary,
    },
    errorAlert: {
        color: Colors.light,
        fontWeight: "bold",
    },
});