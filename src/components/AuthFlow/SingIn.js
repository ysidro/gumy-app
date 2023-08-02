import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React,{useState} from 'react'

import { auth } from "../../firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"


import { globalStyles } from "../../styles/global";
import { Colors } from "../../constants/Colors";


import CustomInput from "../CustomInputs";
import CustomButtons from "../CustomButtons";


export default function SingIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passVisible, setPassVisible] = useState(false);

  const handlerFirebaseSubmit = () => {
    if(email === "" && password === ""){
      Alert.alert("Los campos no debe estar vacios")
      return
    }
    if(!isValidEmail(email)){
      Alert.alert("Debe colocar un email valido")
      return
    }
    registerUser( name,email, password)

  }

  function isValidEmail(email) {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  async function registerUser(name, email, password) {
    try {
       createUserWithEmailAndPassword(auth,email, password)
       .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        user.updateProfile({
          displayName: name,
          userRole: "Delivery",
        });
        console.log('User registered:', user);
        // ...
      })
      .catch((error) => {
        console.log('User registered:', error);
        // ..
      });

      console.log('User registered:', user);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }

  return (
    <View style={globalStyles.screenContainer}>
      
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