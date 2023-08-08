import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React,{useState} from 'react'

import { db } from "../../firebaseConfig"
import { doc, setDoc,addDoc,collection } from 'firebase/firestore';


import { globalStyles } from "../../styles/global";
import { Colors } from "../../constants/Colors";

import CustomDropDown from '../CustomDropDown';
import CustomInput from "../CustomInputs";
import CustomButtons from "../CustomButtons";


export default function SingIn({setUpdateScreen}) {

  const roleList =[{'ID': 'delivery' ,'Name':'Delivery'}, {'ID': 'supervisor' ,'Name':'Supervisor'}, {'ID': 'vendedor' , 'Name':'Vendedor'}];

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [passVisible, setPassVisible] = useState(false);

  const handlerFirebaseSubmit = () => {
    setToken(generateRandomNumber());

    if(email === "" && password === ""){
      Alert.alert("Los campos no debe estar vacios")
      return
    }
    if(!isValidEmail(email)){
      Alert.alert("Debe colocar un email valido")
      return
    }
    registerUser( name,email, password, token)

  }

  function generateRandomNumber() {
    const min = 100000; // Mínimo valor de 6 dígitos (100000)
    const max = 999999; // Máximo valor de 6 dígitos (999999)
    return Math.floor(Math.random() * (max - min + 1)) + min;
    
  }
  


  function isValidEmail(email) {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  async function registerUser() {
    try {
      
     const user = { name: name, email: email, password: password,rolle:role, token:token};
     const newUserRef =  await addDoc(collection(db, 'users'), user);
     if(newUserRef){
      setUpdateScreen(true);
     }
      //  createUserWithEmailAndPassword(auth,email, password)
      //  .then((userCredential) => {
      //   // Signed in 
      //   const user = userCredential.user;
      //   user.updateProfile({
      //     displayName: name,
      //     userRole: "Delivery",
      //   });
      //   console.log('User registered:', user);
      //   // ...
      // })
      // .catch((error) => {
      //   console.log('User registered:', error);
      //   // ..
      // });
  
      console.log('User registered:', newUserRef.id);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }

  return (
    <View style={globalStyles.screenContainer}>
      <CustomDropDown
                value={role}
                onChangeSelect={(value) => setRole(value)}
                label={"Rol"}
                
                data={ roleList} />

      <CustomInput label={"Nombre"} value={name} onChangeText={setName} />
      <CustomInput label={"Email"} value={email} onChangeText={setEmail} />
      <CustomInput
        label={"Password"}
        secureTextEntry={!passVisible}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={ ()=> setPassVisible(!passVisible) } >
        <Text style={styles.btnShowPassword}>Ver Password</Text>
      </TouchableOpacity>
          <Text>{token}</Text>
      <CustomButtons
        title={"Guardar"}
        onPress={() => handlerFirebaseSubmit()}
      />

    
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
  btnShowPassword:{
    padding:10,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  btnSwitchProfile:{
    marginTop: 30,
  },
  btnSwitchProfileLabel:{
    padding:10,
    color: Colors.secondary,
  },
  errorAlert: {
    color: Colors.light,
    fontWeight: "bold",
  },
});