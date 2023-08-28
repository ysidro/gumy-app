import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React,{useState,useEffect} from 'react'

import { db } from "../../firebaseConfig"
import { doc, setDoc,addDoc,collection } from 'firebase/firestore';


import { globalStyles } from "../../styles/global";
import { Colors } from "../../constants/Colors";

import CustomDropDown from '../CustomDropDown';
import CustomInput from "../CustomInputs";
import CustomButtons from "../CustomButtons";


export default function SingIn({setUpdateScreen}) {

  const roleList =[{'ID': 'delivery' ,'Name':'Delivery'}, {'ID': 'supervisor' ,'Name':'Supervisor'}, {'ID': 'vendedor' , 'Name':'Vendedor'}];
  const vendedorList = [
    {
      "ID": "0ff988e8-5a12-4eea-25d6-08db91c1e4b2",
      "Name": "Asael Francis"
    },
    {
      "ID": "4b96a81f-81da-4896-1c64-08db97fad768",
      "Name": "Derian Garcia"
    },
    {
      "ID": "36d177e1-7748-425e-008d-08db91bf74ce",
      "Name": "Michael Berroa"
    },
    {
      "ID": "34b99dd3-a023-4f0a-7a34-08d94853d4df",
      "Name": "Ricardo Antonio Villanueva Serralles"
    },
    {
      "ID": "fc87f8d4-3426-47c3-521f-08d9cb95ccc6",
      "Name": "Tienda  Herrera"
    },
    {
      "ID": "999d08fc-8e8b-42ca-db43-08d95807f49f",
      "Name": "Tienda  Villa Juana"
    },
    {
      "ID": "7604240b-cbea-4137-5253-08db77d5a018",
      "Name": "Vendedor Cibao 1"
    },
    {
      "ID": "9c114c0f-389b-434d-db42-08d95807f49f",
      "Name": "Vendedor SDE"
    },
    {
      "ID": "91f9289a-3ca7-41e1-18f1-08d9fd89e5c6",
      "Name": "Vendedor SDN"
    },
    {
      "ID": "97a79e13-5c3d-48df-d027-08d9af390597",
      "Name": "Vendedor SDO"
    },
    {
      "ID": "93e150d5-b61e-45d7-47be-08db7d51127a",
      "Name": "Vendedor Zona Este"
    },
    {
      "ID": "55f6c63a-b8c1-4540-35f2-08db77cf35bb",
      "Name": "Vendedor Zona Sur"
    }
  ];
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [admToken, setAdmToken] = useState("");
  const [token, setToken] = useState("");


useEffect(() => {
  setToken(generateRandomNumber());
},[]);

  const handlerFirebaseSubmit = () => {
    

    if(email === "" && password === ""){
      Alert.alert("Los campos no debe estar vacios")
      return
    }
    if(!isValidEmail(email)){
      Alert.alert("Debe colocar un email valido")
      return
    }
    registerUser()

  }

  function generateRandomNumber() {
    const min = 100000; // Mínimo valor de 6 dígitos (100000)
    const max = 999999; // Máximo valor de 6 dígitos (999999)
    return Math.floor(Math.random() * (max - min + 1)) + min;
    
  }
  

  function asinSalesToken(token){
    
    const SalesArray = vendedorList.filter((vendor) => vendor.ID === token);

    setName(SalesArray[0].Name);
    setAdmToken(token);
  }

  function isValidEmail(email) {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  async function registerUser() {
    try {
      
     const user = { name: name, email: email, rolle:role, token:token, adm_token:admToken};

     const newUserRef =  await addDoc(collection(db, 'users'), user);
     if(newUserRef){
      setUpdateScreen(true);
     }
      
  
      console.log('User registered:', newUserRef.id);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }

  return (
    <View style={globalStyles.screenContainer}>
      <View style={styles.tokenLabel}>
          <Text style={styles.tokenText}>Token: {token}</Text>
      </View>
      <CustomDropDown
                value={role}
                onChangeSelect={(value) => setRole(value)}
                label={"Elija una Categoría"}
                
                data={ roleList} />
              { role === "vendedor" ? <CustomDropDown
                value={name}
                onChangeSelect={(value) => asinSalesToken(value)}
                label={"Seleccione un Vededor"}
                
                data={ vendedorList} /> : <CustomInput label={"Nombre"} value={name} onChangeText={setName} /> }
      
      <CustomInput label={"Email"} value={email} onChangeText={setEmail} />

      
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
  tokenLabel: {
    backgroundColor: Colors.primary,
    padding:15,
    width: "100%",
    borderRadius: 14,
  },
  tokenText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: "14px",
  }
});