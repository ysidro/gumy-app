import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React,{useState} from 'react'

import { globalStyles } from "../../styles/global";
import { Colors } from "../../constants/Colors";

import CustomInput from "../CustomInputs";
import CustomButtons from "../CustomButtons";
import { auth } from "../../firebaseConfig"

export default function SingIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passVisible, setPassVisible] = useState(false);

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
        onPress={() => null}
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
    color: Colors.ligth,
  },
  btnShowPassword:{
    padding:10,
    fontWeight: "bold",
    color: Colors.secundary,
  },
  btnSwitchProfile:{
    marginTop: 30,
  },
  btnSwitchProfileLabel:{
    padding:10,
    color: Colors.secundary,
  },
  errorAlert: {
    color: Colors.ligth,
    fontWeight: "bold",
  },
});